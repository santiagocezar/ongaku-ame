import '~/styles/artist.css'
import { Form, Link, Outlet, useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/search";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "ongaku ame" },
		{ name: "description", content: "la aplicación inspirada por la música de la lluvia" },
	];
}

export default function Browse() {
	const [params] = useSearchParams()
	const navigate = useNavigate()

	return (
		<main className="flex flex-col">
			<header className="flex gap-4 p-4">
				<button onClick={() => navigate(-1)} className="font-title flex items-center text-lg gap-1">
					<div className="icon back"></div>
				</button>
				<Link to="/" className="font-title flex items-center text-lg gap-1">
					<div className="icon house"></div>
				</Link>

                <div className="grow-1"></div>

				<Form action="/browse" method="get">
					<input className="w-full px-4 py-2 text-2xl border-b-2 placeholder-white" type="search" name="q" placeholder="Buscar artista..." defaultValue={params.get("q") ?? ""} />
				</Form>
			</header>
            <Outlet />
		</main>
	);
} 
