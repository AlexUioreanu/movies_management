import { Root, MovieDetails } from "@/types";

const APIKEY = "96d31308896f028f63b8801331250f03";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getTrendingMovies(page: number = 1): Promise<Root> {
  const url = `${BASE_URL}/trending/all/day?api_key=${APIKEY}&page=${page}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getTopRatedMovies(page: number = 1): Promise<Root> {
  const url = `${BASE_URL}/movie/top_rated?api_key=${APIKEY}&page=${page}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getMovieById({
  movieid,
}: {
  movieid: number;
}): Promise<MovieDetails> {
  const url = `${BASE_URL}/movie/${movieid}?api_key=${APIKEY}&language=en-US`;

  const response = await fetch(url);
  if (!response.ok) {
    console.log("error");
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
}
