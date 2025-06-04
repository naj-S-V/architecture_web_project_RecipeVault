import type { APIEvent } from "@solidjs/start/server";
import { addUser } from "~/lib/user";

export async function POST(event: APIEvent) {
    return await addUser(await event.request.formData());
}