import { finishAuth } from "~/lib/spoti";
import type { Route } from "./+types/pong";
import { redirect } from "react-router";

export async function clientLoader({
    request
}: Route.ClientLoaderArgs) {
    const code = new URL(request.url).searchParams.get("code") ?? ""
    const href = await finishAuth(code)

    return redirect(href)
}

export default function Home({
	loaderData,
}: Route.ComponentProps) {
	return "ok";
} 
