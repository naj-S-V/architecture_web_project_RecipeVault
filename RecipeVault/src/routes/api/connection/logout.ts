import { db } from "~/lib/db";
import { logout } from "~/lib/user";
import { type APIEvent } from "@solidjs/start/server";

export async function POST(event: APIEvent) {
  try {
    // Fetch all matches from the database
    await logout();
    return { success: true };
  } catch (error) {
    console.error("Error login:", error);
    return new Response(JSON.stringify({ error: "Failed to connect" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}