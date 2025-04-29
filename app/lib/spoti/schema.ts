import * as v from 'valibot';

export const Token = v.object({
    access_token: v.string(),
    token_type: v.string(),
    expires_in: v.number(),
})

export const Artist = v.object({
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

export const ArtistsResponse = v.object({
    artists: v.object({
        items: v.array(Artist),
        total: v.number(),
        limit: v.number(),
        offset: v.number(),
        href: v.string(),
        next: v.nullable(v.string()),
        previous: v.nullable(v.string()),
    }),
});

export type Token = v.InferOutput<typeof Token>
export type Artist = v.InferOutput<typeof Artist>
export type ArtistsResponse = v.InferOutput<typeof ArtistsResponse>
