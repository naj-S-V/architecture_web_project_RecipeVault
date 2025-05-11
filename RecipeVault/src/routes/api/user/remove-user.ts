import type { APIEvent } from "@solidjs/start/server";
import { removeUser } from "~/lib/user";

export async function POST(event: APIEvent) {
    return await removeUser(await event.request.formData());
}