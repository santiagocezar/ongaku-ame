import * as v from 'valibot';

const ResultsOf = <T extends v.GenericSchema>(type: T) => v.object({
    items: v.array(type),
    total: v.number(),
    limit: v.number(),
    offset: v.number(),
    href: v.string(),
    next: v.nullable(v.string()),
    previous: v.nullable(v.string()),
})

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

export const SpotifyObject = v.object({
    external_urls: ExternalURLs,
    href: v.string(),
    id: v.string(),
    uri: v.string(),
})

export const SimplifiedArtist = v.object({
    ...SpotifyObject.entries,
    name: v.string(),
    type: v.string(),
});

export const Artist = v.object({
    ...SimplifiedArtist.entries,
    followers: v.object({
        href: v.nullable(v.string()), // puede ser null a veces
        total: v.number(),
    }),
    genres: v.array(v.string()),
    images: v.array(ImageInfo),
    popularity: v.number(),
});

export const ArtistsResponse = v.object({
    artists: ResultsOf(Artist),
});

export const SimplifiedAlbum = v.object({
    ...SpotifyObject.entries,
    album_type: v.string(),
    total_tracks: v.number(),
    available_markets: v.array(v.string()),
    images: v.array(ImageInfo),
    name: v.string(),
    release_date: v.string(),
    release_date_precision: v.string(),
    restrictions: v.optional(v.object({
        reason: v.string(),
    })),
    type: v.string(),
    // album_group: v.string(),
});

export const ArtistsAlbums = ResultsOf(SimplifiedAlbum);

export const SimplifiedTrack = v.object({
    ...SpotifyObject.entries,
    artists: v.array(SimplifiedArtist),
    available_markets: v.array(v.string()),
    disc_number: v.number(),
    duration_ms: v.number(),
    explicit: v.boolean(),
    is_playable: v.optional(v.boolean()),
    linked_from: v.optional(v.object({
        ...SpotifyObject.entries,
        type: v.string(),
    })),
    restrictions: v.optional(v.object({
        reason: v.string(),
    })),
    name: v.string(),
    track_number: v.number(),
    type: v.string(),
    is_local: v.boolean(),
});

export const Album = v.object({
    ...SimplifiedAlbum.entries,
    artists: v.array(SimplifiedArtist),
    tracks: ResultsOf(SimplifiedTrack),
    copyrights: v.array(v.object({
        text: v.string(),
        type: v.string(),
    })),
    external_ids: v.object({
        isrc: v.optional(v.string()),
        ean: v.optional(v.string()),
        upc: v.optional(v.string()),
    }),
    label: v.string(),
    popularity: v.number(),
});

export const Track = v.object({
    ...SimplifiedTrack.entries,
    album: SimplifiedAlbum,
    popularity: v.number(),
});

export const SeveralTracks = v.object({
    tracks: v.array(Track),
});

export type Token = v.InferOutput<typeof Token>
export type ImageInfo = v.InferOutput<typeof ImageInfo>
export type ExternalURLs = v.InferOutput<typeof ExternalURLs>
export type SpotifyObject = v.InferOutput<typeof SpotifyObject>
export type SimplifiedArtist = v.InferOutput<typeof SimplifiedArtist>
export type Artist = v.InferOutput<typeof Artist>
export type ArtistsResponse = v.InferOutput<typeof ArtistsResponse>
export type SimplifiedAlbum = v.InferOutput<typeof SimplifiedAlbum>
export type ArtistsAlbums = v.InferOutput<typeof ArtistsAlbums>
export type SimplifiedTrack = v.InferOutput<typeof SimplifiedTrack>
export type Album = v.InferOutput<typeof Album>
export type SeveralTracks = v.InferOutput<typeof SeveralTracks>
