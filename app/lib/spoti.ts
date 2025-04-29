import * as v from 'valibot';

const Token = v.object({
    access_token: v.string(),
    token_type: v.string(),
    expires_in: v.number(),
})

const ArtistSchema = v.object({
    external_urls: v.object({
        spotify: v.string(),
    }),
    followers: v.object({
        href: v.nullable(v.string()), // puede ser null a veces
        total: v.number(),
    }),
    genres: v.array(v.string()),
    href: v.string(),
    id: v.string(),
    images: v.array(
        v.object({
            url: v.string(),
            height: v.number(),
            width: v.number(),
        })
    ),
    name: v.string(),
    popularity: v.number(),
    type: v.string(), // podrías hacer un literal('artist') si querés más estrictitud
    uri: v.string(),
});

const ArtistsResponseSchema = v.object({
    artists: v.object({
        items: v.array(ArtistSchema),
        total: v.number(),
        limit: v.number(),
        offset: v.number(),
        href: v.string(),
        next: v.nullable(v.string()),
        previous: v.nullable(v.string()),
    }),
});

export type Token = v.InferOutput<typeof Token>

async function spotiFetch(path: string) {
    const token = await getToken()

    return await fetch("https://api.spotify.com" + path, {
        headers: {
            "Authorization": `${token.token_type} ${token.access_token}`
        }
    }).then(res => res.json())
}

/** usa el access token viejo si no venció, caso contrario emite uno nuevo */
async function getToken() {
    let token = getSavedToken()

    if (token) return token

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`
    }).then((res) => res.json())

    token = v.parse(Token, res)

    saveToken(token)

    return token
}

function getSavedToken(): Token | undefined {
    const serialized = localStorage.getItem("spoti-token")

    if (!serialized) return

    const coma = serialized.indexOf(",")

    if (coma < 0) return

    const expira = parseInt(serialized.slice(0, coma))

    if (expira < new Date().valueOf()) return

    return v.parse(Token, JSON.parse(serialized.slice(coma + 1)))
}

function saveToken(token: Token) {
    localStorage.setItem("spoti-token", `${new Date().valueOf() + token.expires_in * 1000},${JSON.stringify(token)}`)
}

export async function searchArtist(artist: string) {
    const res = await spotiFetch(`/v1/search?${new URLSearchParams({
        q: artist,
        type: "artist"
    })}`)

    return v.parse(ArtistsResponseSchema, res)
}
