import '~/styles/artist.css'
import { Artist, getArtist, getArtistAlbums, needsAuth, searchArtist, setReturnHref, SimplifiedAlbum } from "~/lib/spoti";
import { Link, redirect } from "react-router";
import type { Route } from "./+types/artist";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "ongaku ame" },
		{ name: "description", content: "la aplicación inspirada por la música de la lluvia" },
	];
}

export async function clientLoader({
	params, request
}: Route.ClientLoaderArgs) {
	const authURL = await needsAuth()
	if (authURL !== undefined) {
		setReturnHref(request.url)
		return redirect(authURL)
	}
	const [info, albums] = await Promise.all([
		getArtist(params.id),
		getArtistAlbums(params.id)
	]);
	return { info, albums };
}

function AlbumItem({
	album, i
}: { album: SimplifiedAlbum, i: number }) {
	const imgSrc = album.images?.[0]?.url
	
	return (
		<Link to={"/browse/album/" + album.id} className="flex gap-2 items-start">
			<div 
				style={{
					"--n": i,
				}}
				className="artist-cover h-16 aspect-square"
			>
				<div 
					className="rounded-2xl img w-full h-full bg-cover bg-center bg-white flex items-end"
					style={{
						backgroundImage: imgSrc ? `url('${imgSrc}')` : "none"
					}}
				>
				</div>
			</div>
			<div>
				<p className="text-3xl">
					{album.name}
				</p>
				<p className="font-title">
					{album.release_date.split("-")[0]}
				</p>
			</div>
		</Link>
	)
}

export default function ArtistInfo({
	loaderData,
}: Route.ComponentProps) {
	const imgSrc = loaderData.info.images?.[0]?.url

	return (
		<main className="flex flex-col relative">
			<div
				className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-fixed grayscale opacity-15 blur-lg -z-50"
				style={{
					backgroundImage: imgSrc ? `url('${imgSrc}')` : "none"
				}}
			>
				
			</div>
			<div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] p-4 w-full max-w-6xl mx-auto">
				<aside>
					<div 
						style={{
							"--n": 0,
						}}
						className="artist-cover w-full aspect-square"
					>
						<div 
							className="img w-full h-full bg-cover bg-center bg-white flex items-end"
							style={{
								backgroundImage: imgSrc ? `url('${imgSrc}')` : "none"
							}}
						>
						</div>
					</div>
					<h1 className="text-6xl leading-[1em] pt-2">
						{loaderData.info.name}
					</h1>
					<p className="text-xl font-title">{loaderData.info.followers.total.toLocaleString(undefined, {maximumSignificantDigits: 3, notation: 'compact'})} seguidores</p>
				</aside>
				<article>
					<h2 className="font-title text-3xl px-8">Albums</h2>
					<div className="flex flex-col gap-2 p-8">
						{loaderData.albums.items.map((album, i) => (
							<AlbumItem album={album} i={i} />
						))}
					</div>
				</article>
			</div>
		</main>
	);
} 
