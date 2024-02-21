"use client";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import { getTopRatedMovies } from "@/utils";
import { Result, Root } from "@/types";
import { MovieCard } from "@/components/MovieCard";
import { url } from "node:inspector";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [data, setData] = useState<Result[] | undefined>();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
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
        setData(allMovies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div
      style={{
        maxWidth: "100vw",
        height: "100vh",
        overflowX: "hidden",
        backgroundImage: "url('/backgrounddoodleextended.png')",
        backgroundSize: "cover", 
        backgroundPosition: "center", 
      }}
    >
    
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
      </div>

      <div
        style={{ position: "relative", color: "white", textAlign: "center" }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Featured Movie Details Here
        </div>
      </div>

      <div style={{ padding: "1rem", textAlign: "center" }}>
        {" "}
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
          {data?.map((movie: Result) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isMustWatch={movie.vote_average >= 7 ? true : false}
              isFavorite={true}
              onClick={() => {
                router.push(`/${movie.id}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
