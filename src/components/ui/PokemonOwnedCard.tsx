import { Pokemon } from "@/types/Pokemon"
import Image from "next/image"
import { MouseEventHandler } from "react"

const PokemonOwnedCard = ({ pokemon, handleRelease }: { pokemon: Pokemon, handleRelease: MouseEventHandler}) => {
    return (
        <div key={pokemon.id} className="bg-secondary p-3  rounded hover:bg-primary hover:text-white flex justify-between items-center shadow-md">
            <div className="flex flex-row justify-start items-center gap-4">
                <Image
                    src={pokemon.imageSrc}
                    alt={`pokemon-${pokemon.name}`}
                    width={50}
                    height={50}
                    draggable={false}
                />
                <p className="sm:block hidden capitalize">{pokemon.name}</p>
            </div>
            <div>
                <button className="bg-red-500 px-2 py-1 rounded text-white hover:scale-110" onClick={handleRelease}>Release</button>
            </div>
        </div>
    )
}

export default PokemonOwnedCard;