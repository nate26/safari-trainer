import request from 'graphql-request';
import { PokeApiPokemon, PokeApiPokemonGQL } from '../interfaces/PokeAPIPokemon.interface';
import { Pokemon } from '../interfaces/Pokemon.interface';
import { PokeApiSpecies } from '../interfaces/PokeAPISpecies.interface';

export const MAX_POKEMON = 150; // 1024;

const getSelectedPokemonGQL = (id: number) => `
    query samplePokeAPIquery {
        pokemon_v2_pokemon(where: {pokemon_species_id: {_eq: ${id}}}) {
            name
            id
            pokemon_v2_pokemonsprites {
                sprites
            }
            pokemon_v2_pokemonspecy {
                capture_rate
                pokemon_v2_pokemonspeciesnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
                    name
                }
            }
        }
    }
`;

const getPokemonGQLById = async (rand: number): Promise<PokeApiPokemonGQL> => request(
    'https://beta.pokeapi.co/graphql/v1beta',
    getSelectedPokemonGQL(rand)
);

export const enrichPokemon = (data: PokeApiPokemonGQL): Pokemon => {
    const pokemon = data.pokemon_v2_pokemon[0];
    const isShiny = Math.random() > 0.8;
    const sprites = pokemon.pokemon_v2_pokemonsprites[0]?.sprites ?? {
        front_shiny: '',
        front_default: ''
    };
    return {
        id: pokemon.id,
        name: pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0].name ?? pokemon.name,
        catchRate: pokemon.pokemon_v2_pokemonspecy.capture_rate,
        shiny: isShiny,
        sprite: isShiny ? sprites.front_shiny : sprites.front_default
    };
};

export const getPokemonGQL = () => {
    const rand = Math.round(Math.random() * MAX_POKEMON) + 1;
    return getPokemonGQLById(rand);
};




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

export const enrichPokemonREST = (data: [PokeApiPokemon, PokeApiSpecies]): Pokemon => {
    const [pokemon, species] = data;
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

    return getPokemonApi(rand)
        .then((pokemon) => Promise.all([pokemon, getSpeciesApi(pokemon)]));
};
