import { authOptions } from "@/lib/config/authOptions";
import { LogIn } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { LoginButton, LogoutButton } from "./auth";

const Home = async () => {
  const session: any = await getServerSession(authOptions);
  return (
    <div>
      {session && (
        <Link
          className="flex gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          href="/dashboard/users"
        >
          <h1>Dashboard</h1>
          <LogIn />
        </Link>
      )}
      <LoginButton />
      <LogoutButton />
    </div>
  );
};

export default Home;
