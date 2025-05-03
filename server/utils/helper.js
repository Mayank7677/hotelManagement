const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dqfhn7rw3",
  api_key: "382695276612379",
  api_secret: "3XWIpGNiRSe2K2Cs2t9-fUtPPY0",
});

exports.uploadFile = async (files) => {
  const fileArray = Array.isArray(files.images) ? files.images : [files.images]; // handles both single and multiple images
  const results = [];

  for (const file of fileArray) {
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "hotel_rooms",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
            });
          }
        );

        stream.end(file.data);
      });

      results.push(result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return results;
};
