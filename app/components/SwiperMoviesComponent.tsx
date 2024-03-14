import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieCard from "./MovieCard";
import { Result, Root } from "@/types";
import { useRouter } from "next/navigation";
import { fetchMultiplePages } from "@/utils";
import Title from "./Title";

export default async function SwiperMoviesComponent({
  title,
  fetchMoviesFunction,
  ids = [],
}: {
  title: string;
  fetchMoviesFunction: (page: number) => Promise<Root>;
  ids: number[];
}) {
  const router = useRouter();

  const [movies, setMovies] = useState<Result[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchMultiplePages({
        fetchFunction: fetchMoviesFunction,
        totalPages: 6,
      });
      setMovies(results);
      console.log(results);
    };

    fetchData();
  }, []);

  return (
    <>
      <Title title={title} />
      <Swiper
        spaceBetween={10}
        slidesPerView={12}
        centeredSlides={true}
        loop={true}
        style={{ padding: "1rem" }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 60,
          },
          1400: {
            slidesPerView: 7,
            spaceBetween: 70,
          },
          1536: {
            slidesPerView: 14,
            spaceBetween: 80,
          },
        }}
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
}
