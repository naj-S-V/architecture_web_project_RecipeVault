import type { APIEvent } from "@solidjs/start/server";
import { getUsers, updateUser } from "~/lib/user";

export async function POST(event: APIEvent) {
    return await updateUser(await event.request.formData());
}