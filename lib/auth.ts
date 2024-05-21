"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "alimsolutions";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(loginData: any) {
  if (loginData && loginData.staff_id && loginData.staff_name) {
    const staff = {
      staff_id: loginData.staff_id,
      staff_name: loginData.staff_name,
      role: loginData.role,
    };

    const currentDate = new Date();

    const oneDayLaterTimestamp =
      currentDate.getTime() + 1 * 24 * 60 * 60 * 1000;

    const expires = new Date(oneDayLaterTimestamp);
    const session = await encrypt({ staff, expires });

    cookies().set("staff", session, { expires, httpOnly: true });
  } else {
    console.log("No user found");
  }
}

export async function logout() {
  // Destroy the session
  cookies().set("staff", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("staff")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("staff")?.value;
  if (!session) return;

  const currentDate = new Date();

  const oneDayLaterTimestamp = currentDate.getTime() + 1 * 24 * 60 * 60 * 1000;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = oneDayLaterTimestamp;
  const res = NextResponse.next();
  res.cookies.set({
    name: "staff",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
