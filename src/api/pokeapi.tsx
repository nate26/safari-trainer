import { useQuery } from '@tanstack/react-query';
import { PokeApiPokemon } from '../interfaces/poke-api-pokemon.interface';
import { PokeApiSpecies } from '../interfaces/poke-api-species.interface';
import { Pokemon } from '../interfaces/pokemon.interface';

export const MAX_POKEMON = 150; // 1024;

const getApi = <T,>(url: string): Promise<T> => {
    return fetch(url)
        .then((response) => response.json())
        .catch(console.error);
};

const getPokemonApi = (id: number): Promise<PokeApiPokemon> => {
    return getApi(`https://pokeapi.co/api/v2/pokemon/${id}`);
};

const getSpeciesApi = (pokemon: PokeApiPokemon): Promise<PokeApiSpecies> => {
    return getApi(pokemon.species.url);
};

const enrichPokemon = (pokemon: PokeApiPokemon, species: PokeApiSpecies): Pokemon => {
    const isShiny = Math.random() > 0.8;
    return {
        id: pokemon.id,
        name: species.names.find(lang => lang.language.name === 'en')?.name ?? pokemon.name,
        catchRate: species.capture_rate,
        shiny: isShiny,
        sprite: isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default
    };
};

export const getPokemon = () => {
    const rand = Math.round(Math.random() * MAX_POKEMON) + 1;

    return useQuery<Pokemon>({
        queryKey: ['repoData'],
        queryFn: () => getPokemonApi(rand)
            .then((pokemon) => Promise.all([pokemon, getSpeciesApi(pokemon)]))
            .then(([ pokemon, species ]) => enrichPokemon(pokemon, species))
    });
};
