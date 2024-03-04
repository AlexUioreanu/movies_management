import React, { useEffect, useState } from "react";
import OutlinedTextField from "./OutlinedTextField";
import { Result } from "@/types";
import { getMoviesByName } from "@/utils";
import MovieCard from "./MovieCard";
import { useRouter } from "next/navigation";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  var baseMovies: Result[] = [];
  var initialThreeLetters: string = "";

  useEffect(() => {
    if (query.length == 3) {
      initialThreeLetters = query;
      setIsLoading(true);
      const fetchMovies = async () => {
        const totalPages = 1;

        for (let page = 1; page <= totalPages; page++) {
          const fetchedMovies = await getMoviesByName({
            movieName: query,
            page,
          });
          baseMovies.push(...fetchedMovies.results);
        }

        setFilteredMovies(baseMovies);
        setIsLoading(false);
      };
      fetchMovies();
    }

    if (query) {
      const filteredList = baseMovies.filter((movie) =>
        movie.title?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filteredList);
    } else {
      setFilteredMovies([]);
    }
  }, [query]);

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
          gap: "1rem",
          paddingTop: "1rem",
        }}
      >
        {filteredMovies.length > 0 &&
          filteredMovies.map((movie: Result) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isMustWatch={movie.vote_average >= 7 ? true : false}
              isFavorite={true}
              onClick={() => router.push(`/dashboard/${movie.id}`)}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchComponent;
