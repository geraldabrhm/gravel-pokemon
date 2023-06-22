import { Pokemon } from '../types/Pokemon';

export const getPokemonDetail = async (pokeId: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
    const pokemonDetail = await response.json();
    return pokemonDetail;
}

export const getPokemonList = async (page: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
    const data = await response.json();

    const dataCounts: number = data.count;

    const pokemonsUrlList: string[] = data.results.map(
        (pokemon: any) => {
            return pokemon.url;
        }
    );

    const pokemonsDataPromises: Promise<Pokemon>[] = pokemonsUrlList.map
        (async (endpoint: string) => {
            const pokemonResponse = await fetch(endpoint);
            const pokemonData = await pokemonResponse.json();
            const { id, name } = pokemonData;
            const imageSrc = pokemonData.sprites.other['official-artwork'].front_default;
    
            return { id, name, imageSrc } as Pokemon;
        }
    );

    const pokemonsData = await Promise.all(pokemonsDataPromises);

    return {
        pokemonsData: pokemonsData,
        countPokemon: dataCounts,
    };
};