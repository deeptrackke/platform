import { NextResponse } from "next/server";
import axios from "axios";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  const { email, password, terms } = await request.json();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { email, password, terms }
    );
    const { accessToken, refreshToken, user } = response.data;

    if (accessToken && refreshToken && user) {
      // Create a secure session with HTTP‑only cookie.
      await createSession({
        user,
        accessToken,
        refreshToken,
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Login failed" }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error("Login error:", error);
    const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
      ? error.response.data.message
      : "Internal Server Error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
