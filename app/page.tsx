import Form from "./login/form";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    // console.log(session);
  }
  return <Form />;
}
