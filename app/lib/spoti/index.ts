import * as v from 'valibot';
import { getSavedToken, mustGetSavedToken } from './token';
import { generateAuthURL } from './auth';
import { ArtistsResponse } from './schema';

export * from "./schema"
export * from "./auth"
export { NoTokenError } from "./token"

export async function searchArtist(artist: string) {
    const res = await spotiFetch(`/v1/search?${new URLSearchParams({
        q: artist,
        type: "artist"
    })}`)

    return v.parse(ArtistsResponse, res)
}

async function spotiFetch(path: string) {
    const token = mustGetSavedToken()

    return await fetch("https://api.spotify.com" + path, {
        headers: {
            "Authorization": `${token.token_type} ${token.access_token}`
        }
    }).then(res => res.json())
}

