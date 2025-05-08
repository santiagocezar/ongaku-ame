import '~/styles/artist.css'
import { getAlbum, getSeveralTracks, needsAuth, setReturnHref, spotiLoader } from "~/lib/spoti";
import { Link, redirect } from "react-router";
import type { Route } from "./+types/likes";
import TrackItem from '~/lib/components/TrackItem';
import { listaLikes, tieneLike } from '~/lib/likesData';
import { useLiveQuery } from 'dexie-react-hooks';

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "ongaku ame" },
		{ name: "description", content: "la aplicación inspirada por la música de la lluvia" },
	];
}

export const clientLoader = spotiLoader(
	async (_: Route.ClientLoaderArgs) => {
        const ids = (await listaLikes()).map(data => data.id)
        const tracks = ids.length ? (await getSeveralTracks(ids)).tracks : []
		return { tracks }
    }
)

export default function Likes({
	loaderData,
}: Route.ComponentProps) {
    const conLike = useLiveQuery(async () => {
        return new Set((await listaLikes()).map(like => like.id))
    })

	return (
        <main className="grid grid-cols-1 p-4 w-full max-w-6xl mx-auto">
            {/* <aside>
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
            </aside> */}
            <article>
                <h2 className="font-title text-3xl">
                    Tus Me Gusta
                </h2>
                <div className="flex flex-col gap-2 py-8">
                    {loaderData.tracks.length ? (
                        loaderData.tracks.filter(track => conLike?.has(track.id)).map((track, i) => (
                            <TrackItem showArtist key={track.id} album={track.album} track={track} i={i} />
                        ))
                    ) : (
                        <p className='text-2xl'>No hay ninguno!</p>
                    )}
                </div>
            </article>
		</main>
	);
} 
