import type { Route } from "./+types/home";
import { Form, Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "ongaku ame" },
		{ name: "description", content: "la aplicación inspirada por la música de la lluvia" },
	];
}

export default function Home({
	loaderData,
}: Route.ComponentProps) {
	return (
		<main id="home" className="flex flex-col items-center justify-center p-2 h-full">
			<div className="browse-area flex flex-col items-center bg-white p-4">
				<Form action="/browse" method="get">
					<input className="px-4 py-2 text-3xl border-b-2 placeholder-[#b2b2b2]" type="search" name="q" placeholder="Buscar artista..." />
				</Form>
				<Link to="/browse/likes" className="font-title flex items-center text-lg gap-1 p-4">
					<div className="icon like"></div>
					Canciones que me gustaron
				</Link>
			</div>
		</main>
	);
} 
