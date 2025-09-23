import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    // Directly compare with the environment variable
    if (password === process.env.ADMIN_PASSWORD) {
      // Set a secure, httpOnly cookie upon successful authentication
      const cookieStore = await cookies();
      cookieStore.set("admin-session", "true", {
        // The value can be simple, the security is in httpOnly
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/", // Make the cookie available across the entire site
      });
      return NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );
    } else {
      // If the password does not match, return an unauthorized error
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    // Handle potential errors like malformed JSON
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
