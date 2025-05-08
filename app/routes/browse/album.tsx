import '~/styles/artist.css'
import { getAlbum, needsAuth, setReturnHref, spotiLoader } from "~/lib/spoti";
import { Link, redirect } from "react-router";
import type { Route } from "./+types/album";
import TrackItem from '~/lib/components/TrackItem';

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "ongaku ame" },
		{ name: "description", content: "la aplicación inspirada por la música de la lluvia" },
	];
}

export const clientLoader = spotiLoader(
	async ({ params }: Route.ClientLoaderArgs) => (
		{ album: await getAlbum(params.id) }
	)
)

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
					<h2 className="font-title text-3xl pt-8 md:pt-0 md:px-8">
						Pistas
					</h2>
					<div className="flex flex-col gap-2 py-8 md:px-8">
						{loaderData.album.tracks.items.map((track, i) => (
							<TrackItem key={track.id} album={loaderData.album} track={track} i={i} />
						))}
					</div>
				</article>
			</div>
		</main>
	);
} 
