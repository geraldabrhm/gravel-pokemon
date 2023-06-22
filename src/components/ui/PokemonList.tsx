import PokemonCard from "@/components/ui/PokemonCard";
import { Pokemon } from "@/types/Pokemon";

const PokemonList = ({ pokemonList, searchPrompt }: { pokemonList: Pokemon[], searchPrompt: string}) => {
    const fragmentList: React.ReactNode[] = [];

    pokemonList.forEach((pokemon) => {
        if(searchPrompt !== "" && !pokemon.name.includes(searchPrompt)) return;
        fragmentList.push(<PokemonCard key={pokemon.id} pokemonItem={pokemon}/>)
    })

    return(
        <>
            <section id="pokemon-list" className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-4 px-24">
                { fragmentList }
            </section>
            {
                fragmentList.length === 0 &&
                <div className="w-full">
                    <h4 className="text-center w-full">There is no pokemon with your search prompt in this page</h4>
                </div>
            }
        </>
    )
}

export default PokemonList;