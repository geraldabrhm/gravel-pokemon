import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "@/types/Pokemon";

const PokemonCard = ({ pokemonItem }: { pokemonItem: Pokemon }) => {
    const { id, name, imageSrc } = pokemonItem;
    return (
        <div>
            <Link href={`/pokemon/${id}`}>
                <div className="bg-tertiary rounded-md flex justify-center drop-shadow-md">
                    <Image src={imageSrc} alt="pokemon" width={200} height={200}/>
                </div>
            </Link>
            <h5 className="px-3 py-1 text-center capitalize">{ name }</h5>
            <div className="px-3 flex flex-row justify-center gap-1">
                <span className="px-1 bg-red-200 rounded italic">Fire</span>
                <span className="px-1 bg-lime-500 rounded italic">Grass</span>
            </div>
        </div>
    )
}

export default PokemonCard;