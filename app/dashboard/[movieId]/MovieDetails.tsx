"use client";
import { getMovieById } from "@/utils";
import { ExternalIdType, MovieDetails, Result } from "@/types";
import { Suspense, useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Loading from "./loading";

export default function MovieDetailsWithSuspense({
  params,
  searchParams,
}: any) {
  const [movie, setMovie] = useState<MovieDetails | undefined>();
  const [isFavorite, setIsFavorite] = useState<boolean>(
    searchParams.isFavorite === "true"
  );

  const handleFavoriteClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const movieId = params.movieId;

    try {
      const response = await fetch(`/api/auth/favorites`, {
        method: isFavorite ? "DELETE" : "PUT",
        body: JSON.stringify({ movieId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        console.log("Favorite updated successfully");
      } else {
        console.error("Error updating favorite:", await response.json());
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const movieDetails = await getMovieById({
        movieid: params.movieId,
      });
      console.log(movieDetails);
      setMovie(movieDetails);
    }
    fetchData();
  }, [params.movieId]);

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
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          boxShadow: "0 0 16px 16px rgba(0,0,0,0.3)",
        }}
      >
        {isFavorite && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: "5px solid orange",
              borderRadius: "10px",
              pointerEvents: "none",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
            handleFavoriteClick(e);
          }}
        >
          <Image
            src={isFavorite ? "/heart-fav.svg" : "/hearth.svg"}
            layout="responsive"
            width={10}
            height={10}
            alt=""
          />
        </div>
        <h1
          style={{
            fontSize: "60px",
          }}
        >
          {movie?.title}
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              boxShadow: "0 4x 8px 0 rgba(0,0,0,0.7)",
              borderRadius: "15px",
            }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt=""
              width={300}
              height={450}
              style={{ borderRadius: "15px" }}
            />
          </div>
          <p>
            ⭐ {movie?.vote_average.toFixed(1)} ({movie?.vote_count} votes)
          </p>
          <strong>Overview</strong>
          <p style={{ textAlign: "center" }}>{movie?.overview}</p>
          <p>
            <strong>Genres:</strong>{" "}
            {movie?.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Release Date:</strong> {movie?.release_date}
          </p>
          <p>
            <strong>Runtime:</strong> {movie?.runtime} minutes
          </p>
          <p
            style={{
              color: movie?.status === "Released" ? "green" : "red",
            }}
          >
            <strong>Status:</strong> {movie?.status}
          </p>
          {movie?.homepage && (
            <p>
              <a style={{ color: "blue" }} href={movie?.homepage}>
                movie website
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
