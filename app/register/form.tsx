"use client";
import OutlinedTextField from "@/app/components/OutlinedTextField";
import { whiteButtonOutlineStyles } from "@/utils";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Form() {
  const router = useRouter();

  const [inputs, setinputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: inputs.email,
        password: inputs.password,
        name: inputs.name,
      }),
    });
    if (response.ok) {
      console.log("Registered successfully");
      router.push("/login");
    } else {
      throw Error("failed to register");
    }
  };
  return (
    <div className="signInSignUpContainer">
      <Image
        className="mb-56"
        width={300}
        height={300}
        src="/logo.svg"
        alt="Logo"
      />

      <div
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        <h1
          style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Welcome
        </h1>
        <p style={{ fontSize: "24px", fontWeight: "initial" }}>
          Please register yourself
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-96 mt-10 ">
        <OutlinedTextField
          name="name"
          label="Name"
          type="text"
          onChange={handleChange}
          value={inputs.name}
          required
          sx={whiteButtonOutlineStyles}
        />
        <OutlinedTextField
          name="email"
          label="Email"
          onChange={handleChange}
          value={inputs.email}
          required
          sx={whiteButtonOutlineStyles}
        />
        <OutlinedTextField
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          value={inputs.password}
          required
          sx={whiteButtonOutlineStyles}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#FFA500",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            outline: "none",
          }}
        >
          Register
        </button>

        <Link
          href="/login"
          sx={{
            textDecoration: "none",
            color: "#056bf0",
            fontWeight: "normal",
          }}
        >
          You have an account? SignIn
        </Link>
      </form>
    </div>
  );
}
