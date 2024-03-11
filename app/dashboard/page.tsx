"use client";
import { useEffect, useState } from "react";
import {
  getAiringTvShows,
  getPopularMovies,
  getStars,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/utils";
import { People, PopularPeople, Result, Root } from "@/types";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { SwiperMoviesComponent } from "@/components/SwiperMoviesComponent";
import { SwiperStarsComponent } from "@/components/SwiperStarsComponent";
import SearchComponent from "@/components/SearchComponent";

export default function DashboardPage() {
  const router = useRouter();

  const [trendingMovies, setTrendingMovies] = useState<Result[] | undefined>();
  const [upcomingMovies, setUpcomingMovies] = useState<Result[] | undefined>();
  const [topRatedMovies, setTopRatedMovies] = useState<Result[] | undefined>();
  const [popularMovies, setPopularMovies] = useState<Result[] | undefined>();
  const [airingTvShows, setAiringTvShows] = useState<Result[] | undefined>();
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
        console.log("failed to fetch favorite movies IDs");
        console.error("Failed to fetch favorite movies IDs");
      }
    } catch (error) {
      console.error("Error fetching favorite movies IDs:", error);
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
    async function fetchUpcomingMovies() {
      var baseMovies: Result[] = [];
      for (let page = 1; page <= totalPages; page++) {
        const fetchedMovies = await getUpcomingMovies(page);
        baseMovies.push(...fetchedMovies.results);
      }
      console.log(baseMovies);
      setUpcomingMovies(baseMovies);
    }
    async function fetchTopRatedMovies() {
      var baseMovies: Result[] = [];
      for (let page = 1; page <= totalPages; page++) {
        const fetchedMovies = await getTopRatedMovies(page);
        baseMovies.push(...fetchedMovies.results);
      }
      console.log(baseMovies);
      setTopRatedMovies(baseMovies);
    }
    async function fetchPopularMovies() {
      var baseMovies: Result[] = [];
      for (let page = 1; page <= totalPages; page++) {
        const fetchedMovies = await getPopularMovies(page);
        baseMovies.push(...fetchedMovies.results);
      }
      console.log(baseMovies);
      setPopularMovies(baseMovies);
    }
    async function fetchAiringTvShows() {
      var baseMovies: Result[] = [];
      for (let page = 1; page <= totalPages; page++) {
        const fetchedMovies = await getAiringTvShows(page);
        baseMovies.push(...fetchedMovies.results);
      }
      console.log(baseMovies);
      setAiringTvShows(baseMovies);
    }

    getFavoriteMoviesId();

    fetchTrendingMovies();
    fetchStars();
    fetchUpcomingMovies();
    fetchTopRatedMovies();
    fetchPopularMovies();
    fetchAiringTvShows();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/backgrounddoodleextended.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ padding: "1rem", textAlign: "center" }}>
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

        <SwiperMoviesComponent
          movies={upcomingMovies || []}
          title=" Upcoming Movies"
          ids={favoriteMoviesId}
        />
        <SwiperMoviesComponent
          movies={topRatedMovies || []}
          title=" Top Rated Movies"
          ids={favoriteMoviesId}
        />
        <SwiperMoviesComponent
          movies={popularMovies || []}
          title=" Popular Movies"
          ids={favoriteMoviesId}
        />
        <SwiperMoviesComponent
          movies={airingTvShows || []}
          title=" Airing TV Shows"
          ids={favoriteMoviesId}
        />
        <SearchComponent
          onFavoriteClick={() => getFavoriteMoviesId()}
          ids={favoriteMoviesId}
        />
      </div>
    </div>
  );
}
