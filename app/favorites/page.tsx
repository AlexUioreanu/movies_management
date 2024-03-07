"use client";
import React, { useEffect, useState } from "react";

const FavoritesPage = () => {
  const [favoriteMovies, setfavoriteMovies] = useState([]);

  useEffect(() => {
    async function fetchFavoriteIds() {
      try {
        const response = await fetch(`/api/auth/favorites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Fetched favorite ids successfully");
        } else {
          console.error("Error getting the ids", await response.json());
        }
      } catch (error) {
        console.error("Error getting the ids:", error);
      }
    }
  });

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
        justifyContent: "center",
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
          position: "relative",
          flexDirection: "row",
          justifyContent: "center",
          textAlign: "center",
          boxShadow: "0 0 16px 16px rgba(0,0,0,0.3)",
        }}
      >
        fadsfsadfdsdfs fsdafads sdfasdfdsa
      </div>
    </div>
  );
};

export default FavoritesPage;
