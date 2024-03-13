import { Result } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export const MovieCard: React.FC<{
  movie: Result;
  isMustWatch: boolean;
  isFavorite: boolean;
  onFavoriteClick?: () => void;
  onClick: () => void;
}> = ({
  movie,
  isMustWatch,
  isFavorite,
  onFavoriteClick = () => {},
  onClick,
}) => {
  const [isFavorites, setIsFavorites] = useState<boolean>(isFavorite);

  useEffect(() => {
    setIsFavorites(isFavorite);
  }, [isFavorite]);

  const handleFavoriteClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const movieId = movie.id;

    try {
      const response = await fetch(`/api/auth//favorites`, {
        method: isFavorites ? "DELETE" : "PUT",
        body: JSON.stringify({ movieId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsFavorites(!isFavorites);
        onFavoriteClick();
        console.log("Favorite updated successfully");
      } else {
        console.error("Error updating favorite:", await response.json());
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <div className="movie-card" onClick={() => onClick()}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        layout="responsive"
        width={250}
        height={325}
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
          handleFavoriteClick(e);
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
