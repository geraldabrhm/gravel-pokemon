"use client";
import { useEffect, useState } from "react";
import { Pokemon } from "@/types/Pokemon";
import PokemonOwnedCard from "@/components/ui/PokemonOwnedCard";

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
            <section className="flex flex-col justify-start px-32 gap-2 min-w-fit">
                {   
                    ownedPokemons.map((pokemon: Pokemon) => {
                        return (
                            <PokemonOwnedCard pokemon={pokemon} handleRelease={() => releasePokemon(pokemon.id)} />
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