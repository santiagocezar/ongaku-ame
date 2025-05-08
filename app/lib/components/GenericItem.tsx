import { Link } from "react-router"
import type { Album, SimplifiedTrack } from "../spoti"

interface GenericItemProps extends React.PropsWithChildren {
    src?: string,
    link: string,
    title: string,
    subtitle: string,
    i: number,
}

export default function GenericItem(props: GenericItemProps) {
    return (
        <div className="grid grid-cols-[1fr_auto]">
            <Link to={props.link} className="flex gap-2 items-start">
                <div 
                    style={{
                        "--n": props.i,
                    }}
                    className="artist-cover h-16 aspect-square"
                >
                    <div 
                        className="rounded-2xl img w-full h-full bg-cover bg-center bg-white flex items-end"
                        style={{
                            backgroundImage: props.src ? `url('${props.src}')` : "none"
                        }}
                    >
                    </div>
                </div>
                <div className="grow">
                    <p className="text-3xl">
                        {props.title}
                    </p>
                    <p className="font-title">
                        {props.subtitle}
                    </p>
                </div>
            </Link>
            {props.children}
        </div>
    )
}
