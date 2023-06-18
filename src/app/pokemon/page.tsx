"use client";

import Icon from "@/components/general/Icon";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import PokemonList from "@/components/ui/PokemonList";
import { Pokemon } from "@/types/Pokemon";
import { getPokemonList } from "@/apis/PokemonAPI";

const PokemonPage = () => {
    const [page, setPage] = useState(1);
    const [countPage, setCountPage] = useState<number>(1);
    const [listDirectPage, setListDirectPage] = useState<number[]>([1, 2, 3, 4, 5]);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        const setPokemonListAsync = async () => {
            const pokemons = await getPokemonList(page);
            setPokemonList(pokemons.pokemonsData);

            const countPage = Math.ceil(pokemons.countPokemon / 20) - 2;
            setCountPage(countPage);
        }

        setPokemonListAsync();

        if (page > 3) {
            if (page + 2 > countPage) {
                const listDirectPage = [countPage - 4, countPage - 3, countPage - 2, countPage - 1, countPage];
                setListDirectPage(listDirectPage);
                return;
            } else {
                const listDirectPage = [page - 2, page - 1, page, page + 1, page + 2];
                setListDirectPage(listDirectPage);
            }
        } else {
            const listDirectPage = [1, 2, 3, 4, 5];
            setListDirectPage(listDirectPage);
        }
    }, [page])

    return (
        <div className="p-4  min-h-screen flex flex-col justify-start items-start gap-3">
            <h2>Pok&eacute;mon Set</h2>
            <div id="pokemon-set" className="flex flex-col justify-start items-start gap-5 min-h-screen w-full">
                <section id="pokemon-list-controller">
                    <div className="bg-[#F2F2F2] flex flex-row justify-start items-center p-1 rounded-md shadow-md">
                        <Icon color="#828282" size="1.5rem" iconComponent=  {<AiOutlineSearch/>}/>
                        <input name="pokemon-search" type="text" placeholder="Search" className="bg-inherit text-[#828282] px-2 py-1"/>
                    </div>
                </section>
                <PokemonList pokemonList={pokemonList}/>
                <section id="pokemon-pagination" className="w-full">
                    <div className="flex flex-row justify-center items-center gap-2">
                        {   page === 1 ? null :
                            <>
                                <button className="bg-[#F2F2F2] px-2 py-1 rounded-md drop-shadow-md hover:bg-primary hover:text-white" onClick={() => setPage(1)}>First</button>
                                <button className="bg-[#F2F2F2] px-2 py-1 rounded-md drop-shadow-md hover:bg-primary hover:text-white" onClick={() => setPage(page - 1)}>&lt;</button>
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
                            page === countPage ? null :
                            <>
                                <button className="bg-[#F2F2F2] px-2 py-1 rounded-md drop-shadow-md hover:bg-primary hover:text-white" onClick={() => setPage(page + 1)}>&gt;</button>
                                <button className="bg-[#F2F2F2] px-2 py-1 rounded-md drop-shadow-md hover:bg-primary hover:text-white" onClick={() => setPage(countPage)}>Last</button>
                            </>
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default PokemonPage;