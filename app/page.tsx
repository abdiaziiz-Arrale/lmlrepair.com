import { authOptions } from "@/lib/config/authOptions";
import { LogIn } from "lucide-react";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { LoginButton, LogoutButton } from "./auth";

interface UserInfoProps {
  user: {
    staff_name: string;
    mobile_number: string;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <div className="flex flex-col items-start p-4 bg-white rounded shadow">
    <Link
      className="flex gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      href="/dashboard/users"
    >
      <h1>Dashboard</h1>
      <LogIn />
    </Link>
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Logged in user:</h2>
      <ul className="list-disc ml-5 mt-2">
        <li>Name: {user.staff_name}</li>
        <li>Mobile: {user.mobile_number}</li>
      </ul>
    </div>
  </div>
);

const Home = async () => {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {session ? (
        <>
          <UserInfo user={session.user as UserInfoProps["user"]} />
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default Home;
