import Image from "next/image";
import Form from "./register/form";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
  return <Form />;
}
