"use client";
import { Suspense, useEffect, useState } from "react";
import {
  getAiringTvShows,
  getPopularMovies,
  getStars,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/utils";
import { People, Result } from "@/types";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import SwiperMoviesComponent from "@/app/components/SwiperMoviesComponent";
import { SwiperStarsComponent } from "@/app/components/SwiperStarsComponent";
import SearchComponent from "@/app/components/SearchComponent";
import Loading from "./loading";
import Title from "../components/Title";

export default function DashboardPage() {
  const router = useRouter();

  const [trendingMovies, setTrendingMovies] = useState<Result[] | undefined>();
  const [stars, setStars] = useState<People[] | undefined>();

  const [favoriteMoviesId, setFavoriteMoviesId] = useState<number[]>([]);

  const getFavoriteMoviesId = async () => {
    try {
      const response = await fetch(`/api/auth/favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(response);

        const data = await response.json();
        console.log(data);
        setFavoriteMoviesId(data.movieIds);
        console.log(favoriteMoviesId);
      } else {
        throw Error(`Failed to fetch favorite movies IDs`);
      }
    } catch (error) {
      throw Error(`Error fetching favorite movies ID ${error}`);
    }
  };

  useEffect(() => {
    const totalPages = 6;
    async function fetchTrendingMovies() {
      var baseMovies: Result[] = [];
      for (let page = 1; page <= totalPages; page++) {
        const fetchedMovies = await getTrendingMovies(page);
        baseMovies.push(...fetchedMovies.results);
      }

      console.log(baseMovies);
      setTrendingMovies(baseMovies);
    }
    async function fetchStars() {
      var baseStars: People[] = [];
      for (let page = 1; page <= totalPages; page++) {
        const fetchStars = await getStars(page);
        baseStars.push(...fetchStars.results);
      }
      console.log(baseStars);
      setStars(baseStars);
    }

    getFavoriteMoviesId();

    fetchTrendingMovies();
    fetchStars();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/backgrounddoodleextended.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "100vw", overflow: "hidden" }}>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true, dynamicBullets: true }}
          style={{ height: "525px" }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 60,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 70,
            },
            1536: {
              slidesPerView: 3,
              spaceBetween: 80,
            },
          }}
        >
          {trendingMovies?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "500px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "15px",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.7)",
                }}
                onClick={() => {
                  router.push(`/dashboard/${movie?.id}`);
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  style={{
                    borderRadius: "15px",
                  }}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    background: "rgba(0, 0, 0, 0.4)",
                    color: "white",
                    padding: "10px",
                    textAlign: "center",
                    borderRadius: "0 0 15px 15px",
                  }}
                >
                  <h3 style={{ margin: 0 }}>{movie.title}</h3>
                  <p style={{ margin: 0 }}>
                    ⭐ {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <SwiperStarsComponent title={"Stars"} stars={stars || []} />

      <Suspense fallback={<Loading />}>
        <SwiperMoviesComponent
          title=" Upcoming Movies"
          ids={favoriteMoviesId}
          fetchMoviesFunction={getUpcomingMovies}
        />
        <SwiperMoviesComponent
          title="Top Rated Movies"
          ids={favoriteMoviesId}
          fetchMoviesFunction={getTopRatedMovies}
        />
        <SwiperMoviesComponent
          title="Popular Movies"
          ids={favoriteMoviesId}
          fetchMoviesFunction={getPopularMovies}
        />
        <SwiperMoviesComponent
          title="Airing TV Shows"
          ids={favoriteMoviesId}
          fetchMoviesFunction={getAiringTvShows}
        />
      </Suspense>

      <SearchComponent
        onFavoriteClick={() => getFavoriteMoviesId()}
        ids={favoriteMoviesId}
      />
    </div>
  );
}
