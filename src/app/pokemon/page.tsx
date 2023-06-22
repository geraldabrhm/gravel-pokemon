"use client";

import { useEffect, useState, useMemo } from "react";
import PokemonList from "@/components/ui/PokemonList";
import { Pokemon } from "@/types/Pokemon";
import { getPokemonList } from "@/apis/PokemonAPI";
import PaginationButton from "@/components/ui/PaginationButton";
import PokemonListController from "@/components/ui/PokemonListController";

const PokemonPage = () => {
    const [page, setPage] = useState<number>(1);
    const [searchPrompt, setSearchPrompt] = useState<string>("");
    const [amountPages, setAmountPages] = useState<number>(1);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    const listDirectPage = useMemo(
        () => {
            if (page > 3) {
                if (page + 2 > amountPages) {
                    const sequence = [amountPages - 4, amountPages - 3, amountPages - 2, amountPages - 1, amountPages];
                    return sequence;
                } else {
                    const sequence = [page - 2, page - 1, page, page + 1, page + 2];
                    return sequence;
                }
            } else {
                const sequence = [1, 2, 3, 4, 5];
                return sequence;
            }
        },
    [page]);

    useEffect(() => {
        const setPokemonListAsync = async () => {
            const pokemons = await getPokemonList(page);
            setPokemonList(pokemons.pokemonsData);
        }

        setPokemonListAsync();
    }, [page])

    useEffect(() => {
        const setAmountPagesAsync = async () => {
            const pokemons = await getPokemonList(page);

            const amount = Math.ceil(pokemons.countPokemon / 20) - 2;
            setAmountPages(amount);
        }
        
        setAmountPagesAsync();
    }, []);

    return (
        <div className="p-4  min-h-screen flex flex-col justify-start items-start gap-3">
            <h2>Pok&eacute;mon Set</h2>
            <div id="pokemon-set" className="flex flex-col justify-start items-start gap-5 min-h-screen w-full">
                <PokemonListController searchPrompt={searchPrompt} setSearchPrompt={setSearchPrompt}/>
                <PokemonList pokemonList={pokemonList} searchPrompt={searchPrompt}/>
                <section id="pokemon-pagination" className="w-full">
                    <div className="flex flex-row justify-center items-center gap-2">
                        {   page === 1 ? null :
                            <>
                                <PaginationButton text="First" clickHandler={() => setPage(1)}/>
                                <PaginationButton text="&lt;" clickHandler={() => setPage(page - 1)}/>
                            </>
                        }
                        {
                            listDirectPage.map((iteratedPage: number) => {
                                return (
                                    <button key={iteratedPage} className={`${iteratedPage == page ? 'bg-black text-white' : 'bg-[#F2F2F2]'} px-2 py-1 rounded-md drop-shadow-md hover:bg-primary hover:text-white`} onClick={() => setPage(iteratedPage)}>{iteratedPage}</button>
                                )
                            })
                        }
                        {
                            page === amountPages ? null :
                            <>
                                <PaginationButton text="&gt;" clickHandler={() => setPage(page + 1)}/>
                                <PaginationButton text="Last" clickHandler={() => setPage(amountPages)}/>
                            </>
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default PokemonPage;