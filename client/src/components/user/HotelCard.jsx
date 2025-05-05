import React, { useEffect, useRef, useState } from "react";

import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BASE_URL from "../../utils/api";
import axios from "axios";
import { Link } from "react-router-dom";

const imgArr = [
  "https://res.cloudinary.com/dqfhn7rw3/image/upload/v1746366622/hotel_rooms/hm2keaibvlsejba099v0.jpg",
  "https://res.cloudinary.com/dqfhn7rw3/image/upload/v1746366623/hotel_rooms/tobv9pnl8twxgx844kev.jpg",
  "https://res.cloudinary.com/dqfhn7rw3/image/upload/v1746366625/hotel_rooms/umijglaiguwhkra7wu4k.jpg",
  "https://res.cloudinary.com/dqfhn7rw3/image/upload/v1746366626/hotel_rooms/s8qgp5nrl15r2io7qzg9.jpg",
];
const HotelCard = ({ hotel }) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Link to={`/roomPage/${hotel._id}`} state={{ hotelData: hotel }}>
      <div className="flex flex-row-reverse gap-5  border p-[5px] rounded-3xl bg-white">
        <div className="">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {hotel.hotelImages.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="rounded-3xl overflow-hidden h-70 sm:w-80">
                    <img
                      className="h-full w-full object-cover"
                      src={img?.url}
                      alt=""
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>

        <div className="flex flex-col justify-between py-4 px-3">
          <div className="mt-3 pl-1 overflow-hidden">
            <p className="text-left text-3xl  tracking-tighter font-serif">
              {hotel.name} , {hotel.locationId.name}
            </p>
            <p className=" text-gray-900 tracking-tighter text-md font-serif">
              {hotel.address}
            </p>
          </div>
          <p className=" text-gray-700 tracking-tight font-[400] text-md mt-3 leading-5 font-serif">
            {hotel.description}
          </p>

          <div className="mt-3">
            <p className=" text-gray-700 tracking-tight font-[400] text-md font-serif">
              {hotel.contactEmail}
            </p>
            <p className=" text-gray-700 tracking-tighter text-md font-serif">
              {hotel.contactNumber}
            </p>
          </div>
          <p className=" text-gray-700 tracking-tighter text-md mt-3 font-serif">
            Rooms starting at{" "}
            <span className="underline text-green-700 text-lg font-mono tracking-tighter">
              ₹4999
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
