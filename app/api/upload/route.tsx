import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename || !request.body) {
      return NextResponse.json({
        message: "Filename or request body is missing",
      });
    }

    const blob = await put(filename, request.body, {
      access: "public",
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Error creating blob:", error);
    return NextResponse.json(
      { message: "Failed to create blob" },
      { status: 500 }
    );
  }
}
