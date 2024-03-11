"use client";
import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect, useRouter } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();
  // const router = useRouter();
  if (session) {
    // router.push("/dashboard");
  }
  return <Form />;
}
