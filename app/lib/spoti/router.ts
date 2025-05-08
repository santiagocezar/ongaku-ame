import { redirect } from "react-router";
import { needsAuth, setReturnHref } from "./auth";

export function spotiLoader<Args extends { request: Request }, Ret extends any>(fn: (args: Args) => Promise<Ret>): (args: Args) => Promise<Ret |  Response> {
    return async (args) => {
        const authURL = await needsAuth()
        if (authURL !== undefined) {
            setReturnHref(args.request.url)
            return redirect(authURL)
        }
        return await fn(args)
    }
}