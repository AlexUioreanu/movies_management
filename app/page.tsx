import { redirect } from "next/navigation";
import Form from "./login/form";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }
  return <Form />;
}
