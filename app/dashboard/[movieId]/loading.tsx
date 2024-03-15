import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="secondary" className="py-20" />;
    </div>
  );
};

export default Loading;
