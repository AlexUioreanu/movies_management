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

export default function DashboardPage() {
  const [trendingMovies, setTrendingMovies] = useState<Result[] | undefined>();
  const [upcomingMovies, setUpcomingMovies] = useState<Result[] | undefined>();
  const [topRatedMovies, setTopRatedMovies] = useState<Result[] | undefined>();
  const [popularMovies, setPopularMovies] = useState<Result[] | undefined>();
  const [airingTvShows, setAiringTvShows] = useState<Result[] | undefined>();
  const [stars, setStars] = useState<People[] | undefined>();

  const router = useRouter();

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response1 = await getTrendingMovies(1);
        const response2 = await getTrendingMovies(2);
        const response3 = await getTrendingMovies(3);

        const allMovies: Result[] = [
          ...response1.results,
          ...response2.results,
          ...response3.results,
        ];

        console.log(allMovies);
        setTrendingMovies(allMovies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    }
    async function fetchStars() {
      try {
        const response1 = await getStars(1);
        const response2 = await getStars(2);
        const response3 = await getStars(3);

        const allMovies: People[] = [
          ...response1.results,
          ...response2.results,
          ...response3.results,
        ];

        console.log(allMovies);
        setStars(allMovies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    }
    async function fetchUpcomingMovies() {
      try {
        const response1 = await getUpcomingMovies(1);
        const response2 = await getUpcomingMovies(2);
        const response3 = await getUpcomingMovies(3);

        const allMovies: Result[] = [
          ...response1.results,
          ...response2.results,
          ...response3.results,
        ];

        console.log(allMovies);
        setUpcomingMovies(allMovies);
      } catch (error) {
        console.error("Failed to fetch upcoming movies:", error);
      }
    }
    async function fetchTopRatedMovies() {
      try {
        const response1 = await getTopRatedMovies(1);
        const response2 = await getTopRatedMovies(2);
        const response3 = await getTopRatedMovies(3);

        const allMovies: Result[] = [
          ...response1.results,
          ...response2.results,
          ...response3.results,
        ];

        console.log(allMovies);
        setTopRatedMovies(allMovies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    }
    async function fetchPopularMovies() {
      try {
        const response1 = await getPopularMovies(1);
        const response2 = await getPopularMovies(2);
        const response3 = await getPopularMovies(3);

        const allMovies: Result[] = [
          ...response1.results,
          ...response2.results,
          ...response3.results,
        ];

        console.log(allMovies);
        setPopularMovies(allMovies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    }
    async function fetchAiringTvShows() {
      try {
        const response1 = await getAiringTvShows(1);
        const response2 = await getAiringTvShows(2);
        const response3 = await getAiringTvShows(3);

        const allMovies: Result[] = [
          ...response1.results,
          ...response2.results,
          ...response3.results,
        ];

        console.log(allMovies);
        setAiringTvShows(allMovies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    }
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
            initialSlide={2}
            centeredSlides={true}
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
        />

        <SwiperMoviesComponent
          movies={topRatedMovies || []}
          title=" Top Rated Movies"
        />

        <SwiperMoviesComponent
          movies={popularMovies || []}
          title=" Popular Movies"
        />

        <SwiperMoviesComponent
          movies={airingTvShows || []}
          title=" Airing TV Shows"
        />
      </div>
    </div>
  );
}
