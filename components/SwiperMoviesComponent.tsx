import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieCard from "./MovieCard";
import { Result } from "@/types";
import { useRouter } from "next/navigation";

export const SwiperMoviesComponent = ({
  title,
  movies,
}: {
  title: string;
  movies: Result[];
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
        slidesPerView={15}
        initialSlide={0}
        style={{ padding: "1rem" }}
      >
        {movies?.map((movie: Result) => (
          <SwiperSlide key={movie.id}>
            <MovieCard
              movie={movie}
              isMustWatch={movie.vote_average >= 7 ? true : false}
              isFavorite={true}
              onClick={() => router.push(`/dashboard/${movie.id}`)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
