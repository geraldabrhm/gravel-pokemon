import PokemonCard from "@/components/ui/PokemonCard";
import { Pokemon } from "@/types/Pokemon";

const PokemonList = ({ pokemonList }: { pokemonList: Pokemon[]}) => {
    const fragmentList: React.ReactNode[] = [];

    pokemonList.forEach((pokemon) => {
        fragmentList.push(<PokemonCard key={pokemon.id} pokemonItem={pokemon}/>)
    })

    return(
        <section id="pokemon-list" className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-4 px-24">
            { fragmentList }
        </section>
    )
}

export default PokemonList;