import '~/styles/artist.css'
import { Album, Artist, getAlbum, getArtist, getArtistAlbums, needsAuth, searchArtist, setReturnHref, SimplifiedAlbum, SimplifiedTrack } from "~/lib/spoti";
import { Link, redirect } from "react-router";
import type { Route } from "./+types/album";

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
	const album = await getAlbum(params.id);
	return { album };
}

function TrackItem({
	album, track, i
}: { album: Album, track: SimplifiedTrack, i: number }) {
	const imgSrc = album.images?.[0]?.url
	
	return (
		<Link to={track.external_urls.spotify} className="flex gap-2 items-start">
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
					{track.name}
				</p>
				<p className="font-title">
					{new Intl.DurationFormat(undefined, {
						style: "narrow"
					}).format({
						hours: Math.floor(track.duration_ms / 1000 / 3600),
						minutes: Math.floor((track.duration_ms / 1000) % 3600 / 60),
						seconds: Math.floor((track.duration_ms / 1000) % 60)
					})}
				</p>
			</div>
		</Link>
	)
}

export default function AlbumInfo({
	loaderData,
}: Route.ComponentProps) {
	const imgSrc = loaderData.album.images?.[0]?.url

	return (
		<main className="flex flex-col relative">
			<div
				className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-fixed grayscale opacity-15 blur-lg -z-50"
				style={{
					backgroundImage: imgSrc ? `url('${imgSrc}')` : "none"
				}}
			>
				
			</div>
			<div className="grid grid-cols-[1fr_2fr] p-4 w-full max-w-6xl mx-auto">
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
					<h1 className="text-4xl leading-[1em] pt-2">
						{loaderData.album.name}
					</h1>
					<p className="text-xl font-title">{loaderData.album.total_tracks.toLocaleString()} {loaderData.album.total_tracks === 1 ? "canción" : "canciones"}</p>
					<p className="font-bold font-title">
						por {loaderData.album.artists.map((artist, i) => (
							<>
								{
									i !== 0 && i === loaderData.album.artists.length - 1 ? " y " :
									i > 0 ? ", " :
									"" 
								}
								<Link className="underline" to={"/browse/artist/" + artist.id}>
									{artist.name}
								</Link>
							</>
						))}
					</p>
				</aside>
				<article>
					<h2 className="font-title text-3xl px-8">
						Pistas
					</h2>
					<div className="flex flex-col gap-2 p-8">
						{loaderData.album.tracks.items.map((track, i) => (
							<TrackItem album={loaderData.album} track={track} i={i} />
						))}
					</div>
				</article>
			</div>
		</main>
	);
} 
