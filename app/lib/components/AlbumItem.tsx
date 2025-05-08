import type { SimplifiedAlbum } from "../spoti"
import GenericItem from "./GenericItem"

interface AlbumItemProps {
    album: SimplifiedAlbum
    i: number
}

export default function AlbumItem(props: AlbumItemProps) {    
    return (
        <GenericItem
            src={props.album.images?.[0]?.url}
            link={"/browse/album/" + props.album.id}
            title={props.album.name}
            subtitle={props.album.release_date.split("-")[0]}
            i={props.i}
        />
    )
}
