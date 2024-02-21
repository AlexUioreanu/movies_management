"use client";
import { useEffect, useState } from "react";
import { getTopRatedMovies, getTrendingMovies } from "@/utils";
import { Result, Root } from "@/types";
import { MovieCard } from "@/components/MovieCard";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
  const [topRatedMovies, setTopRatedMovies] = useState<Result[] | undefined>();
  const [trendingMovies, setTrendingMovies] = useState<Result[] | undefined>();

  const router = useRouter();

  useEffect(() => {
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
    fetchTopRatedMovies();
    fetchTrendingMovies();
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
        
        </div>
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
          Top Rated Movies
        </div>
        <div
          style={{
            display: "grid",
            paddingTop: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {topRatedMovies?.map((movie: Result) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isMustWatch={movie.vote_average >= 7 ? true : false}
              isFavorite={true}
              onClick={() => {
                router.push(`/dashboard/${movie.id}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
