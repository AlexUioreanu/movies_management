import React from "react";

export default function Title({ title }: { title: string }) {
  return (
    <div
      className="px-10"
      style={{
        color: "white",
        backgroundColor: "red",
        borderRadius: "20px",
        border: "5px solid orange",
        display: "inline-block",
        textAlign: "center",
      }}
    >
      {title}
    </div>
  );
}
