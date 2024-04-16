import request from 'graphql-request';
import { PokeApiPokemon, PokeApiPokemonGQL } from '../interfaces/PokeAPIPokemon.interface';
import { Pokemon } from '../interfaces/Pokemon.interface';
import { PokeApiSpecies } from '../interfaces/PokeAPISpecies.interface';

// Maximum number of Pokemon to fetch
export const MAX_POKEMON = 150; // 1024 - all pokemon, use subset for now
const GRAPHQL_BASE_URL = 'https://beta.pokeapi.co/graphql/v1beta';
const API_BASE_URL = 'https://pokeapi.co/api/v2';

//#region GraphQL get pokemon

/**
 * Generates a GraphQL query string to fetch a Pokemon by its ID.
 * @param {number} id - The ID of the Pokemon.
 * @returns {string} The GraphQL query string.
 */
const getSelectedPokemonGQL = (id: number): string => `
    query {
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

/**
 * Fetches a Pokemon by its ID using a GraphQL request.
 * @param {number} id - The ID of the Pokemon.
 * @returns {Promise<PokeApiPokemonGQL>} The fetched Pokemon.
 */
const getPokemonGQLById = async (id: number): Promise<PokeApiPokemonGQL> => {
    return await request<PokeApiPokemonGQL>(
        GRAPHQL_BASE_URL,
        getSelectedPokemonGQL(id)
    );
};

/**
 * Enriches a Pokemon object with additional properties.
 * @param {PokeApiPokemonGQL} data - The Pokemon data to enrich.
 * @returns {Pokemon} The enriched Pokemon.
 */
export const enrichPokemon = (data: PokeApiPokemonGQL): Pokemon => {
    const pokemon = data.pokemon_v2_pokemon[0];
    const isShiny = Math.random() > 0.8;
    const sprites = pokemon.pokemon_v2_pokemonsprites[0]?.sprites ?? {
        front_shiny: '',
        front_default: ''
    };
    return {
        id: pokemon.id,
        name: pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0]?.name ?? pokemon.name,
        catchRate: pokemon.pokemon_v2_pokemonspecy.capture_rate,
        shiny: isShiny,
        sprite: isShiny ? sprites.front_shiny : sprites.front_default
    };
};

/**
 * Fetches a random Pokemon using a GraphQL request.
 * @returns {Promise<PokeApiPokemonGQL>} The fetched Pokemon.
 */
export const getPokemonGQL = async (): Promise<PokeApiPokemonGQL> => {
    const id = Math.floor(Math.random() * MAX_POKEMON) + 1;
    return await getPokemonGQLById(id);
};

//#endregion

//#region REST get pokemon

/**
 * Makes a GET request to the specified URL and returns the response as JSON.
 * @param {string} url - The URL to make the request to.
 * @returns {Promise<T>} The response data as JSON.
 */
const getApi = async <T,>(url: string): Promise<T> => {
    const response = await fetch(url);
    return response.json();
};

/**
 * Fetches a Pokemon by its ID using a REST request.
 * @param {number} id - The ID of the Pokemon.
 * @returns {Promise<PokeApiPokemon>} The fetched Pokemon.
 */
const getPokemonApi = (id: number): Promise<PokeApiPokemon> => {
    return getApi(`${API_BASE_URL}/pokemon/${id}`);
};

/**
 * Fetches a Pokemon species by its URL using a REST request.
 * @param {PokeApiPokemon} pokemon - The Pokemon to fetch the species for.
 * @returns {Promise<PokeApiSpecies>} The fetched Pokemon species.
 */
const getSpeciesApi = (pokemon: PokeApiPokemon): Promise<PokeApiSpecies> => {
    return getApi(pokemon.species.url);
};

/**
 * Enriches a Pokemon object with additional properties using REST data.
 * @param {Array} data - The Pokemon and species data to enrich.
 * @returns {Pokemon} The enriched Pokemon.
 */
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

/**
 * Fetches a random Pokemon and its species using REST requests.
 * @returns {Promise<Array>} The fetched Pokemon and species.
 */
export const getPokemon = async (): Promise<[PokeApiPokemon, PokeApiSpecies]> => {
    const rand = Math.round(Math.random() * MAX_POKEMON) + 1;
    const pokemon = await getPokemonApi(rand);
    const species = await getSpeciesApi(pokemon);
    return [pokemon, species];
};

//#endregion