import { Link } from "react-router"
import type { Album, SimplifiedAlbum, SimplifiedTrack } from "../spoti"
import GenericItem from "./GenericItem"
import { useState } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import { agregarLike, borrarLike, tieneLike } from "../likesData"

interface TrackItemProps {
    album: SimplifiedAlbum
    track: SimplifiedTrack
    i: number
}

export default function TrackItem(props: TrackItemProps) {
    const liked = useLiveQuery(() => tieneLike(props.track.id))

    function toggleLike() {
        if (liked) borrarLike(props.track.id)
        else agregarLike(props.track.id)
    }

    return (
        <GenericItem
            src={props.album.images?.[0]?.url}
            link={props.track.external_urls.spotify}
            title={props.track.name}
            subtitle={
                new Intl.DurationFormat(undefined, {
                    style: "narrow"
                }).format({
                    hours: Math.floor(props.track.duration_ms / 1000 / 3600),
                    minutes: Math.floor((props.track.duration_ms / 1000) % 3600 / 60),
                    seconds: Math.floor((props.track.duration_ms / 1000) % 60)
                })
            }
            i={props.i}
        >
			<button onClick={toggleLike} className="font-title flex items-center text-lg gap-1 p-4">
				<div className={"icon " + (liked ? "dislike" : "like")}></div>
			</button>
        </GenericItem>
    )
}
