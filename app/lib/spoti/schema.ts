import * as v from 'valibot';

export const Token = v.object({
    access_token: v.string(),
    token_type: v.string(),
    expires_in: v.number(),
})

export const ImageInfo = v.object({
    url: v.string(),
    height: v.number(),
    width: v.number(),
})

export const ExternalURLs = v.object({
    spotify: v.string(),
})

export const SimplifiedArtist = v.object({
    external_urls: ExternalURLs,
    href: v.string(),
    id: v.string(),
    name: v.string(),
    type: v.string(),
    uri: v.string(),
});

export const Artist = v.object({
    ...SimplifiedArtist.entries,
    // external_urls: ExternalURLs,
    followers: v.object({
        href: v.nullable(v.string()), // puede ser null a veces
        total: v.number(),
    }),
    genres: v.array(v.string()),
    // href: v.string(),
    // id: v.string(),
    images: v.array(ImageInfo),
    // name: v.string(),
    popularity: v.number(),
    // type: v.string(),
    // uri: v.string(),
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

export const SimplifiedAlbum = v.object({
    album_type: v.string(),
    total_tracks: v.number(),
    available_markets: v.array(v.string()),
    external_urls: ExternalURLs,
    href: v.string(),
    id: v.string(),
    images: v.array(ImageInfo),
    name: v.string(),
    release_date: v.string(),
    release_date_precision: v.string(),
    restrictions: v.optional(v.object({
        reason: v.string(),
    })),
    type: v.string(),
    uri: v.string(),
    album_group: v.string(),
});

export const ArtistsAlbums = v.object({
    href: v.string(),
    limit: v.number(),
    next: v.nullable(v.string()),
    offset: v.number(),
    previous: v.nullable(v.string()),
    total: v.number(),
    items: v.array(SimplifiedAlbum),
});

export type Token = v.InferOutput<typeof Token>
export type ImageInfo = v.InferOutput<typeof ImageInfo>
export type ExternalURLs = v.InferOutput<typeof ExternalURLs>
export type SimplifiedArtist = v.InferOutput<typeof SimplifiedArtist>
export type Artist = v.InferOutput<typeof Artist>
export type ArtistsResponse = v.InferOutput<typeof ArtistsResponse>
export type SimplifiedAlbum = v.InferOutput<typeof SimplifiedAlbum>
export type ArtistsAlbums = v.InferOutput<typeof ArtistsAlbums>
