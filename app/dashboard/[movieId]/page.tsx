"use client";
import { getMovieById } from "@/utils";
import { Result } from "@/types";
import { useEffect, useState } from "react";
import React from "react";

export default function MovieDetails({
  params,
}: {
  params: { movieId: number };
}) {
  const [data, setData] = useState<Result | undefined>();

  useEffect(() => {
    async function fetchData() {
      try {
        const movieDetails = await getMovieById({ movieid: params.movieId });
        console.log(movieDetails);
        setData(movieDetails);
      } catch (error) {
        console.log(error); // Ensure this logs the expected data
        console.error("Failed to fetch movie details movies:", error);
      }
    }
    fetchData();
  }, [params.movieId]);

  console.log(data);

  return <div>MovieDetails {params.movieId}</div>;
}
