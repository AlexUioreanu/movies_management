"use client";
import { getMovieById } from "@/utils";
import { ExternalIdType, MovieDetails, Result } from "@/types";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MovieDetailsPage({
  params,
}: {
  params: {
    movieId: number;
  };
}) {
  const [movie, setMovie] = useState<MovieDetails | undefined>();
  console.log(params);

  useEffect(() => {
    async function fetchData() {
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
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          boxShadow: "0 0 16px 16px rgba(0,0,0,0.3)",
        }}
      >
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
          <p style={{ color: movie?.status === "Released" ? "green" : "red" }}>
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
