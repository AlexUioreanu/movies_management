import MovieDetailsWithSuspense from "./MovieDetails";

export default function MovieDetailsPage({ params, searchParams }: any) {
  return (
    <MovieDetailsWithSuspense params={params} searchParams={searchParams} />
  );
}
