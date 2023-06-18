"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Pokemon } from "@/types/Pokemon";

const pocketList = (): Pokemon[] => {
    const pocket = localStorage.getItem("pocket");
    if (pocket) {
        const pocketParsed = JSON.parse(pocket);
        return pocketParsed;
    }
    return [];
}

const PokemonOwnedPage = ({}) => {
    const [ownedPokemons, setOwnedPokemons] = useState<Pokemon[]>([]);

    const releasePokemon = (pokemonId: number) => {
        const pocket = localStorage.getItem("pocket");
        if (pocket) {
            const pocketParsed = JSON.parse(pocket);
            const isPokemonExist = pocketParsed.find((pokemon: any) => pokemon.id === pokemonId);
            if (isPokemonExist) {
                const newPocket = pocketParsed.filter((pokemon: any) => pokemon.id !== pokemonId);
                localStorage.setItem("pocket", JSON.stringify(newPocket));
                setOwnedPokemons(newPocket);
            }
        }
    }

    useEffect(() => {
        setOwnedPokemons(pocketList())
    }, [])

    return(
        <div className="p-4">
            <h2 className="pb-4">Owned Pokemon</h2>
            <section className="flex flex-col justify-start px-32 gap-2">
                {   
                    ownedPokemons.map((pokemon: Pokemon) => {
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
                                    <span>{pokemon.name}</span>
                                </div>
                                <div>
                                    <button className="bg-red-500 px-2 py-1 rounded text-white hover:scale-110" onClick={() => releasePokemon(pokemon.id)}>Release</button>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    ownedPokemons.length === 0 &&
                        <div className="flex justify-center">
                            <h5>There is no owned pokemon</h5>
                        </div>
                }
            </section>
        </div>
    )
}

export default PokemonOwnedPage;