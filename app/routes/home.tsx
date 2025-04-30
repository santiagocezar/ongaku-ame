import type { Route } from "./+types/home";
import { Form } from "react-router";

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
		<main id="home" className="flex flex-col items-center justify-center p-4 h-full">
			<Form action="/browse" method="get">
				<input className="px-4 py-2 text-3xl border-b-2 placeholder-white" type="search" name="q" placeholder="Buscar artista..." />
			</Form>
		</main>
	);
} 
