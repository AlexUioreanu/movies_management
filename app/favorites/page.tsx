"use client";
import MovieCard from "@/app/components/MovieCard";
import { MovieDetails, Result } from "@/types";
import { getMovieById } from "@/utils";
import { useRouter } from "next/navigation";
import router from "next/router";
import React, { useEffect, useState } from "react";

const FavoritesPage = () => {
  const router = useRouter();

  const [favoriteMovies, setfavoriteMovies] = useState<MovieDetails[]>([]);
  const [favoriteMoviesId, setFavoriteMoviesId] = useState<number[]>([]);

  const fetchFavoriteIds = async () => {
    try {
      const response = await fetch(`/api/auth/favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setFavoriteMoviesId([]);
      setfavoriteMovies([]);

      if (response.ok) {
        const data = await response.json();
        setFavoriteMoviesId(data.movieIds);
        console.log("Fetched favorite ids successfully");
      } else {
        console.error("Error getting the ids");
      }
    } catch (error) {
      console.error("Error getting the ids:", error);
    }
  };

  useEffect(() => {
    fetchFavoriteIds();
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      const fetchedMovies: MovieDetails[] = [];

      for (const movieId of favoriteMoviesId) {
        try {
          const movieDetails = await getMovieById({ movieid: movieId });

          fetchedMovies.push(movieDetails);
        } catch (error) {
          console.error(`Failed to fetch data for movie $`);
          throw Error(`Error fetching the details movie ${error}`);
        }
      }

      setfavoriteMovies(fetchedMovies);
      console.log(fetchMovies);
    }

    if (favoriteMoviesId.length > 0) {
      fetchMovies();
    }
  }, [favoriteMoviesId]);

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "100vw",
        height: "100vh",
        backgroundImage: "url('/backgrounddoodleextended.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="wrapper"
        style={{
          alignItems: "center",
          background: "white",
          borderRadius: "15px",
          padding: "2rem",
          display: "flex",
          position: "relative",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1rem",
          textAlign: "center",
          boxShadow: "0 0 16px 16px rgba(0,0,0,0.3)",
        }}
      >
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie: MovieDetails) => (
            <MovieCard
              key={movie.id}
              movie={movie as unknown as Result}
              isMustWatch={movie.vote_average >= 7 ? true : false}
              isFavorite={favoriteMoviesId.includes(movie.id)}
              onFavoriteClick={() => fetchFavoriteIds()}
              onClick={() => {
                const isFavorite = favoriteMoviesId.includes(movie.id);
                router.push(`/dashboard/${movie.id}?isFavorite=${isFavorite}`);
              }}
            />
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <p>You don't have any favorite movies yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
