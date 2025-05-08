import '~/styles/artist.css'
import { getArtist, getArtistAlbums, spotiLoader } from "~/lib/spoti";
import type { Route } from "./+types/artist";
import AlbumItem from '~/lib/components/AlbumItem';

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "ongaku ame" },
		{ name: "description", content: "la aplicación inspirada por la música de la lluvia" },
	];
}

export const clientLoader = spotiLoader(
	async ({ params }: Route.ClientLoaderArgs) => {
		const [info, albums] = await Promise.all([
			getArtist(params.id),
			getArtistAlbums(params.id)
		]);
		return { info, albums };
	}
)

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
							<AlbumItem key={album.id} album={album} i={i} />
						))}
					</div>
				</article>
			</div>
		</main>
	);
} 
