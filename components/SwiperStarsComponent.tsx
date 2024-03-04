import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { People, Result } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const SwiperStarsComponent = ({
  title,
  stars,
}: {
  title: string;
  stars: People[];
}) => {
  const router = useRouter();
  return (
    <>
      <div
        className="px-10"
        style={{
          color: "white",
          backgroundColor: "red",
          borderRadius: "20px",
          border: "5px solid orange",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        {title}
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={9}
        loop={true}
        style={{ padding: "1rem" }}
      >
        {stars?.map((star: People) => (
          <SwiperSlide key={star.id}>
            <div
              className="wrapper p-16"
              style={{
                height: "300px",
                width: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${star.profile_path}`}
                layout="responsive"
                width={300}
                height={300}
                objectFit="fill"
                alt={""}
                style={{
                  borderRadius: "50%",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.7)",
                }}
              />
              <h1
                style={{
                  color: "black",
                  paddingTop: "1rem",
                }}
              >
                {star.name}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
