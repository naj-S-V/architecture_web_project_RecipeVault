import { useSession } from "vinxi/http";

type SessionData = {
    userEmail?: string;
    isAdmin?: boolean;
};

export function getSession() {
    'use server';
    return useSession<SessionData>({
        password: import.meta.env.VITE_SESSION_SECRET,
    })
}