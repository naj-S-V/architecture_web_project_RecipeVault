import { db } from "~/lib/db";
import { login, getUserConnected } from "~/lib/user";
import { type APIEvent } from "@solidjs/start/server";

export async function GET() {
  try {
    // Fetch all matches from the database
    const user = await getUserConnected();
    // Return the matches as JSON
    return new Response(JSON.stringify(user, null, 2), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching matches for debug:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch matches" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(event: APIEvent) {
  try {
    // Fetch all matches from the database
    await login(await event.request.formData());
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