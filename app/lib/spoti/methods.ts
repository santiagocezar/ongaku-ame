import { parse } from 'valibot';
import { mustGetSavedToken } from './token';
import { Artist, ArtistsAlbums, ArtistsResponse, SimplifiedAlbum } from './schema';
import { params } from './util';

export async function searchArtist(q: string) {
    const res = await spotiFetch(`/v1/search?${params({
        q,
        type: "artist"
    })}`)

    return parse(ArtistsResponse, res)
}

export async function getArtist(id: string) {
    const res = await spotiFetch(`/v1/artists/${id}`)

    return parse(Artist, res)
}

export async function getArtistAlbums(id: string) {
    const res = await spotiFetch(`/v1/artists/${id}/albums`)

    return parse(ArtistsAlbums, res)
}

async function spotiFetch(path: string) {
    const token = mustGetSavedToken()

    return await fetch("https://api.spotify.com" + path, {
        headers: {
            "Authorization": `${token.token_type} ${token.access_token}`
        }
    }).then(res => res.json())
}

