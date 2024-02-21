import { Result } from "@/types";
import React, { useState } from "react";
import Image from "next/image";

export const MovieCard: React.FC<{
  movie: Result;
  isMustWatch: boolean;
  isFavorite: boolean;
  onClick: () => void;
}> = ({ movie, isMustWatch, isFavorite, onClick }) => {
  const [isFavorites, setIsFavorites] = useState<boolean>(false);

  return (
    <div className="movie-card" onClick={() => onClick()}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        layout="responsive"
        width={150}
        height={225}
        objectFit="cover"
        alt={""}
      />
      {isMustWatch && (
        <div
          style={{
            position: "absolute",
            bottom: "0",
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            width: "100%",
            textAlign: "center",
            padding: "4px 0",
          }}
        >
          Must Watch
        </div>
      )}
      {isFavorites && (
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
          setIsFavorites(!isFavorites);
        }}
      >
        <Image
          src={isFavorites ? "/heart-fav.svg" : "/hearth.svg"}
          layout="responsive"
          width={10}
          height={10}
          alt=""
        />
      </div>
    </div>
  );
};

export default MovieCard;
