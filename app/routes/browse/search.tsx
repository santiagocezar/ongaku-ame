import '~/styles/artist.css'
import { Artist, needsAuth, searchArtist, setReturnHref } from "~/lib/spoti";
import { Form, Link, redirect, useNavigation, useSearchParams } from "react-router";
import type { Route } from "./+types/search";
import clsx from 'clsx';

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "ongaku ame" },
		{ name: "description", content: "la aplicación inspirada por la música de la lluvia" },
	];
}

export async function clientLoader({
	request
}: Route.ClientLoaderArgs) {
	const authURL = await needsAuth()
	if (authURL !== undefined) {
		setReturnHref(request.url)
		return redirect(authURL)
	}
	const q = new URL(request.url).searchParams.get("q") ?? ""
	const result = await searchArtist(q);
	return { result };
}


function ArtistItem(props: { artist: Artist, i: number }) {
	const imgSrc = props.artist.images?.[0]?.url

	return (
		<Link to={`/browse/artist/${props.artist.id}`} viewTransition className="grid drop-shadow-[0px_2px_0_black]">
			<div 
				style={{
					"--n": props.i,
				}} 
				className="artist-cover w-full aspect-square"
			>
				<div 
					className="img w-full h-full bg-cover bg-center bg-white flex items-end"
					style={{
						backgroundImage: imgSrc ? `url('${imgSrc}')` : "none"
					}}
				>
					<p className="text-3xl leading-[1em] p-2 pt-8 w-full bg-linear-to-b from-transparent to-white">
						{props.artist.name}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default function Home({
	loaderData,
}: Route.ComponentProps) {
	const nav = useNavigation()

	return (
		<div className={clsx("transition-opacity grid auto-rows-min auto-fill-40 md:auto-fill-60 w-full max-w-6xl mx-auto gap-4 p-4", { "opacity-50": nav.state === "loading" })}>
			{loaderData.result.artists.items.map((artist, i) => (
				<ArtistItem artist={artist} i={i} key={artist.id} />
			))}
		</div>
	);
} 
