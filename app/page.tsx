import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "./user";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <main className="">
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User />
    </main>
  );
}
