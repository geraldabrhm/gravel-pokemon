"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "@/utils/TextUtil";

const getPokemonDetail = async (pokeId: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
    const pokemonDetail = await response.json();
    return pokemonDetail;
}

const PokemonDetailPage = ({ params }: { params: { pokeId: string } }) => {
    const [pokemonDetail, setPokemonDetail] = useState<any>({});
    
    const tryCatchPokemon = () => {
        const random = Math.floor(Math.random() * 2);
        if(random === 0) {
            alert("Pokemon escaped!");
            return;
        }
        
        const pocket = localStorage.getItem("pocket");
        if (pocket) {
            const pocketParsed = JSON.parse(pocket);
            const isPokemonExist = pocketParsed.find((pokemon: any) => pokemon.id === pokemonDetail.id);
            if (!isPokemonExist) {
                pocketParsed.push({
                    id: pokemonDetail.id,
                    name: pokemonDetail.name,
                    imageSrc: pokemonDetail.sprites?.other["official-artwork"].front_default
                });
                localStorage.setItem("pocket", JSON.stringify(pocketParsed));
            }
        } else {
            localStorage.setItem("pocket", JSON.stringify([{
                    id: pokemonDetail.id, 
                    name: pokemonDetail.name, 
                    imageSrc: pokemonDetail.sprites?.other["official-artwork"].front_default
                }])
            );
        }
        
        alert("Pokemon catched!");
    }

    useEffect(() => {
        const setPokemonDetailAsync = async () => {
            const pokemonDetail = await getPokemonDetail(params.pokeId);
            setPokemonDetail(pokemonDetail);
        }

        setPokemonDetailAsync();
    }, [])
    
    return (
        <div className="px-24 py-4 grid md:grid-cols-2 sm:grid-cols-1 gap-8">
            <section id="left-side" className="basis-1/2 flex flex-col gap-3">
                <h3 className="py-4">{pokemonDetail.name ? capitalizeFirstLetter(pokemonDetail.name) : pokemonDetail.name}</h3>
                <div className="bg-tertiary rounded-full p-5 flex justify-center shadow-md">
                    <Image 
                        src={pokemonDetail.sprites?.other["official-artwork"].front_default}
                        alt="pokemon"
                        width={200}
                        height={200}
                        draggable={false}
                    />
                </div>
                <div className="flex justify-center">
                    <button className="p-2 bg-secondary rounded-full shadow-md hover:bg-primary hover:text-white hover:scale-110" onClick={() => tryCatchPokemon()}>
                        Add to Pocket
                    </button>
                </div>

            </section>
            <section id="detail-side" className="basis-1/2 bg-">
                <h3 className="py-4">Detail</h3>
                <div className="bg-primary text-white p-3 rounded-md w-full grid lg:grid-cols-2 md:grid-cols-1 gap-3">
                    <div>
                        <h5 className="py-2">Type</h5>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 text-center text-black">
                            {
                                pokemonDetail.types?.map((type: any) => {
                                    return (
                                        <span key={type.type.name} className="px-1 bg-red-200 rounded">{type.type.name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h5 className="py-2">Weight</h5>
                        <p>{pokemonDetail.weight} lbs</p>
                    </div>
                    <div>
                        <h5 className="py-2">Height</h5>
                        <p>{pokemonDetail.height} cm</p>
                    </div>
                    <div>
                        <h5 className="py-2">Abilities</h5>
                        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-3 text-center text-black">
                            {
                                pokemonDetail.abilities?.map((ability: any) => {
                                    return (
                                        <span key={ability.ability.name} className="px-1 bg-red-200 rounded truncate">{ability.ability.name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h5 className="py-2">Moves</h5>
                        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-3 text-center text-black">
                            {
                                pokemonDetail.moves?.map((move: any) => {
                                    return (
                                        <span key={move.move.name} className="px-1 bg-red-200 rounded truncate">{move.move.name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h5 className="py-2">Stats</h5>
                        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-3 text-center text-black">
                            {
                                pokemonDetail.stats?.map((stat: any) => {
                                    return (
                                        <span key={stat.stat.name} className="px-1 bg-red-200 rounded truncate">{stat.stat.name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PokemonDetailPage;