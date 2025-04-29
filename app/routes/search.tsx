import { searchArtist } from "~/lib/spoti";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "ongaku ame" },
		{ name: "description", content: "la aplicación inspirada por la música de la lluvia" },
	];
}

export async function clientLoader({
	params, request
}: Route.ClientLoaderArgs) {
	const q = new URL(request.url).searchParams.get("q") ?? ""
	const artists = await searchArtist(q);
	return { artists };
}


export default function Home({
	loaderData,
}: Route.ComponentProps) {
	return (
		<main className="flex flex-col p-4">
			<img src={loaderData.artists.artists.items[0].images[0].url} width={loaderData.artists.artists.items[0].images[0].width} alt="" />
			{loaderData.artists.artists.items[0].name}
		</main>
	);
} 
