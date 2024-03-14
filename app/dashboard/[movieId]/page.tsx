import { Suspense } from "react";
import MovieDetailsWithSuspense from "./MovieDetails";
import Loading from "./loading";

export default function MovieDetailsPage({ params, searchParams }: any) {
  return (
    <Suspense fallback={<Loading />}>
      <MovieDetailsWithSuspense params={params} searchParams={searchParams} />
    </Suspense>
  );
}
