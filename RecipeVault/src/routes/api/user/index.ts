import type { APIEvent } from "@solidjs/start/server";
import { getUsers, updateUser } from "~/lib/user";

export async function GET(event: APIEvent) {
    return await getUsers();
}