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
  ids = [],
}: {
  title: string;
  movies: Result[];
  ids: number[];
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
        slidesPerView={12}
        loop={true}
        style={{ padding: "1rem" }}
      >
        {movies?.map((movie: Result) => (
          <SwiperSlide key={movie.id}>
            <MovieCard
              key={movie.id}
              movie={movie}
              isMustWatch={movie.vote_average >= 7 ? true : false}
              isFavorite={ids.includes(movie.id)}
              onClick={() => {
                const isFavorite = ids.includes(movie.id);
                router.push(`/dashboard/${movie.id}?isFavorite=${isFavorite}`);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
