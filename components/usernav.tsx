"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";
import { LogoutButton } from "../app/auth";
import Link from "next/link";

export function UserNav() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/02.png" alt="" />
            <AvatarFallback>SR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[99998]">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-light leading-none">
              {loading ? "Loading..." : session?.user?.staff_name || "..."}
            </p>
            <p className=" text-md font-light  leading-none text-muted-foreground">
              {loading ? "Loading..." : session?.user?.email || "..."}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* <DropdownMenuItem>
          <Link href={`/dashboard/leave`}>Requested leaves</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/dashboard/leave/requestleave`}>Change Password</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/dashboard/leave/requestleave`}>Request leave</Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
