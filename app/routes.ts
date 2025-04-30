import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("browse", "routes/browse/layout.tsx", [
        index("routes/browse/search.tsx"),
        route("artist/:id", "routes/browse/artist.tsx"),
        route("album/:id", "routes/browse/album.tsx"),
    ]),
    route("pong", "routes/pong.tsx"),
] satisfies RouteConfig;
