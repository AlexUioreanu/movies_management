import React, { useEffect, useRef, useState } from "react";
import OutlinedTextField from "./OutlinedTextField";
import { Result } from "@/types";
import { getMoviesByName } from "@/utils";
import MovieCard from "./MovieCard";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

const DEBOUNCE_TIMEOUT = 500;

const SearchComponent = ({
  ids = [],
  onFavoriteClick,
}: {
  ids: number[];
  onFavoriteClick: () => void;
}) => {
  const [query, setQuery] = useState("");
  const [searchedMovies, setSearchedMovies] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, DEBOUNCE_TIMEOUT);

  const router = useRouter();

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      setIsLoading(true);
      const fetchMovies = async () => {
        const totalPages = 3;
        var baseMovies: Result[] = [];
        for (let page = 1; page <= totalPages; page++) {
          const fetchedMovies = await getMoviesByName({
            movieName: debouncedQuery,
            page,
          });
          baseMovies.push(...fetchedMovies.results);
        }

        setSearchedMovies(baseMovies);
        setIsLoading(false);
      };
      fetchMovies();
    } else {
      setSearchedMovies([]);
    }
  }, [debouncedQuery]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "black",
        padding: "2rem",
        borderRadius: "3rem",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.7)",
      }}
    >
      <OutlinedTextField
        label="Search movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputLabelProps={{
          style: { color: `red` },
        }}
        InputProps={{
          style: { color: `red` },
        }}
        sx={{
          "& label": { color: "red" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "red" },
            "&:hover fieldset": { borderColor: "red" },
            "&.Mui-focused fieldset": { borderColor: "red" },
          },
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          backgroundColor: "black",
          gap: "1rem",
          marginTop: "1rem",
          overflowY: "scroll",
          height: "600px",
          width: "100%",
        }}
      >
        {isLoading ? (
          <CircularProgress color="secondary" className="py-20" />
        ) : (
          searchedMovies.length > 0 &&
          searchedMovies.map((movie: Result) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteClick={() => {
                onFavoriteClick();
              }}
              isMustWatch={movie.vote_average >= 7 ? true : false}
              isFavorite={ids.includes(movie.id)}
              onClick={() => router.push(`/dashboard/${movie.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export default SearchComponent;
