// RoomCard.jsx
import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
    const pluginRef = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
    

  return (
    <div className="w-fit overflow-hidden p-2 pb-5 rounded-3xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ">
      <Link to={`/roomsdetail/${room._id}`} state={{ roomData: room }}>
        <Carousel
          plugins={[pluginRef.current]}
          className="w-full max-w-xs overflow-hidden"
        >
          <CarouselContent>
            {room.images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="rounded-3xl overflow-hidden h-60 sm:w-80">
                  <img
                    className="h-full w-full object-cover"
                    src={img.url}
                    alt=""
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="mt-3 pl-1 overflow-hidden">
          <p className="text-lg  tracking-tight font-serif">
            {room.hotelId.name} , {room.stateId.name}
          </p>
          <p className="text-[13px] tracking-tight text-gray-600 font-[450]">
            {room.hotelId.address}
          </p>
          {/* <p className="text-sm tracking-tight text-gray-600 font-[450] truncate">
          {room.description}
        </p> */}
          <p className="text-sm text-gray-600 font-[400] mt-3 font-serif">
            <span className="underline text-black text-[17px] font-mono tracking-tighter">
              ₹{room.pricePerNight}
            </span>{" "}
            for 1 night
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
