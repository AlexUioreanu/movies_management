"use client";
import { getMovieById } from "@/utils";
import { ExternalIdType, MovieDetails, Result } from "@/types";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MovieDetailsPage({
  params,
}: {
  params: {
    movieId: number;
  };
}) {
  const [data, setData] = useState<MovieDetails | undefined>();
  console.log(params);

  useEffect(() => {
    async function fetchData() {
      try {
        const movieDetails = await getMovieById({
          movieid: params.movieId,
        });
        console.log(movieDetails);
        setData(movieDetails);
      } catch (error) {
        console.log(error);
        console.error("Failed to fetch movie details movies:", error);
      }
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
      <h1
        style={{
          fontSize: "60px",
        }}
      >
        {data?.title}
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
            alt=""
            width={300}
            height={450}
            style={{ borderRadius: "15px" }}
          />
        </div>
        <strong>Overview</strong>
        <p style={{ textAlign: "center" }}>{data?.overview}</p>
        <p>
          <strong>Genres:</strong>{" "}
          {data?.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <strong>Release Date:</strong> {data?.release_date}
        </p>
        <p>
          <strong>Runtime:</strong> {data?.runtime} minutes
        </p>
        <p style={{ color: data?.status === "Released" ? "green" : "red" }}>
          <strong>Status:</strong> {data?.status}
        </p>
        <p>
          <strong>Vote Average:</strong> {data?.vote_average} (
          {data?.vote_count} votes)
        </p>
        {data?.homepage && (
          <p>
            <a style={{ color: "blue" }} href={data?.homepage}>
              movie website
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
