
import { enrichPokemon, enrichPokemonREST, getPokemon, getPokemonGQL } from './Pokeapi';
import { PokeApiPokemonGQL, PokeApiPokemon, SpritesREST } from '../interfaces/PokeAPIPokemon.interface';
import { Pokemon } from '../interfaces/Pokemon.interface';
import { Name, PokeApiSpecies } from '../interfaces/PokeAPISpecies.interface';
import request from 'graphql-request';

const mockGQLQuery = `
    query {
        pokemon_v2_pokemon(where: {pokemon_species_id: {_eq: 17}}) {
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

describe('pokeapi', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    //#region enrichPokemon
    describe('enrichPokemon', () => {
        it('should enrich a Pokemon object with default properties from a GQL response', () => {
            const pokemon: PokeApiPokemonGQL = {
                pokemon_v2_pokemon: [{
                    name: 'Pidgeotto-2',
                    id: 17,
                    pokemon_v2_pokemonsprites: [{
                        sprites: {
                            front_shiny: 'https://pokeapi.co/media/sprites/pokemon/17-shiny.png',
                            front_default: 'https://pokeapi.co/media/sprites/pokemon/17.png'
                        }
                    }],
                    pokemon_v2_pokemonspecy: {
                        capture_rate: 45,
                        pokemon_v2_pokemonspeciesnames: [
                            {
                                name: 'Pidgeotto',
                            }
                        ]
                    }
                }]
            };

            const expectedEnrichedPokemon: Pokemon = {
                name: 'Pidgeotto',
                id: 17,
                sprite: 'https://pokeapi.co/media/sprites/pokemon/17.png',
                catchRate: 45,
                shiny: false
            };

            jest.spyOn(global.Math, 'random').mockReturnValue(0.11);

            const result = enrichPokemon(pokemon);

            expect(result).toEqual(expectedEnrichedPokemon);
        });
        
        it('should enrich a Pokemon object with shiny properties from a GQL response', () => {
            const pokemon: PokeApiPokemonGQL = {
                pokemon_v2_pokemon: [{
                    name: 'Omanyte-2',
                    id: 138,
                    pokemon_v2_pokemonsprites: [{
                        sprites: {
                            front_shiny: 'https://pokeapi.co/media/sprites/pokemon/138-shiny.png',
                            front_default: 'https://pokeapi.co/media/sprites/pokemon/138.png'
                        }
                    }],
                    pokemon_v2_pokemonspecy: {
                        capture_rate: 31,
                        pokemon_v2_pokemonspeciesnames: [
                            {
                                name: 'Omanyte',
                            }
                        ]
                    }
                }]
            };

            const expectedEnrichedPokemon: Pokemon = {
                name: 'Omanyte',
                id: 138,
                sprite: 'https://pokeapi.co/media/sprites/pokemon/138-shiny.png',
                catchRate: 31,
                shiny: true
            };
            
            jest.spyOn(global.Math, 'random').mockReturnValue(0.81);

            const result = enrichPokemon(pokemon);

            expect(result).toEqual(expectedEnrichedPokemon);
        });
        
        it('should enrich a Pokemon object with a name fallback from a GQL response', () => {
            const pokemon: PokeApiPokemonGQL = {
                pokemon_v2_pokemon: [{
                    name: 'Pidgeotto-2',
                    id: 17,
                    pokemon_v2_pokemonsprites: [{
                        sprites: {
                            front_shiny: 'https://pokeapi.co/media/sprites/pokemon/17-shiny.png',
                            front_default: 'https://pokeapi.co/media/sprites/pokemon/17.png'
                        }
                    }],
                    pokemon_v2_pokemonspecy: {
                        capture_rate: 45,
                        pokemon_v2_pokemonspeciesnames: []
                    }
                }]
            };

            const expectedEnrichedPokemon: Pokemon = {
                name: 'Pidgeotto-2',
                id: 17,
                sprite: 'https://pokeapi.co/media/sprites/pokemon/17.png',
                catchRate: 45,
                shiny: false
            };

            jest.spyOn(global.Math, 'random').mockReturnValue(0.11);

            const result = enrichPokemon(pokemon);

            expect(result).toEqual(expectedEnrichedPokemon);
        });
    });
    //#endregion

    //#region getPokemonGQL
    xdescribe('getPokemonGQL', () => {
        it('should fetch a Pokemon by its ID using a GraphQL request', async () => {
            const expectedPokemon: PokeApiPokemonGQL = {
                pokemon_v2_pokemon: [{
                    name: 'Pidgeotto',
                    id: 17,
                    pokemon_v2_pokemonsprites: [{
                        sprites: {
                            front_shiny: 'https://pokeapi.co/media/sprites/pokemon/17-shiny.png',
                            front_default: 'https://pokeapi.co/media/sprites/pokemon/17.png'
                        }
                    }],
                    pokemon_v2_pokemonspecy: {
                        capture_rate: 45,
                        pokemon_v2_pokemonspeciesnames: [
                            {
                                name: 'Pidgeotto',
                            },
                        ],
                    }
                }]
            };

            jest.spyOn(global.Math, 'random').mockReturnValue(0.11);
            jest.mock('graphql-request', () => ({
                request: jest.fn(() => Promise.resolve({ pokemon_v2_pokemon: [expectedPokemon] }))
            }));

            const result = await getPokemonGQL();

            expect(result).toEqual(expectedPokemon);
            expect(request).toHaveBeenCalledWith('https://beta.pokeapi.co/graphql/v1beta', mockGQLQuery);
        });
    });
    //#endregion

    //#region enrichPokemonREST
    describe('enrichPokemonREST', () => {
        it('should enrich a Pokemon object with default properties using REST data', () => {
            const pokemon = {
                name: 'Pidgeotto',
                id: 17,
                sprites: {
                    front_shiny: 'https://pokeapi.co/media/sprites/pokemon/17-shiny.png',
                    front_default: 'https://pokeapi.co/media/sprites/pokemon/17.png',
                } as SpritesREST,
                species: {
                    name: '',
                    url: 'https://pokeapi.co/api/v2/pokemon-species/17/',
                },
            } as PokeApiPokemon;

            const species = {
                capture_rate: 45,
                names: [
                    {
                        name: 'Pidgeotto',
                        language: {
                            name: 'en',
                            url: ''
                        },
                    },
                ],
            } as PokeApiSpecies;

            const expectedEnrichedPokemon: Pokemon = {
                name: 'Pidgeotto',
                id: 17,
                sprite: 'https://pokeapi.co/media/sprites/pokemon/17.png',
                catchRate: 45,
                shiny: false
            };
            
            jest.spyOn(global.Math, 'random').mockReturnValue(0.11);

            const result = enrichPokemonREST([pokemon, species]);

            expect(result).toEqual(expectedEnrichedPokemon);
        });
        
        it('should enrich a Pokemon object with shiny properties using REST data', () => {
            const pokemon = {
                name: 'Omanyte',
                id: 138,
                sprites: {
                    front_shiny: 'https://pokeapi.co/media/sprites/pokemon/138-shiny.png',
                    front_default: 'https://pokeapi.co/media/sprites/pokemon/138.png',
                } as SpritesREST,
                species: {
                    name: '',
                    url: 'https://pokeapi.co/api/v2/pokemon-species/138/',
                },
            } as PokeApiPokemon;

            const species = {
                capture_rate: 45,
                names: [
                    {
                        name: 'Omanyte',
                        language: {
                            name: 'en',
                            url: ''
                        },
                    },
                ],
            } as PokeApiSpecies;

            const expectedEnrichedPokemon: Pokemon = {
                name: 'Omanyte',
                id: 138,
                sprite: 'https://pokeapi.co/media/sprites/pokemon/138-shiny.png',
                catchRate: 45,
                shiny: true
            };
            
            jest.spyOn(global.Math, 'random').mockReturnValue(0.81);

            const result = enrichPokemonREST([pokemon, species]);

            expect(result).toEqual(expectedEnrichedPokemon);
        });
        
        it('should enrich a Pokemon object with a name fallback using REST data', () => {
            const pokemon = {
                name: 'Pidgeotto-2',
                id: 17,
                sprites: {
                    front_shiny: 'https://pokeapi.co/media/sprites/pokemon/17-shiny.png',
                    front_default: 'https://pokeapi.co/media/sprites/pokemon/17.png',
                } as SpritesREST,
                species: {
                    name: '',
                    url: 'https://pokeapi.co/api/v2/pokemon-species/17/',
                },
            } as PokeApiPokemon;

            const species = {
                capture_rate: 21,
                names: [] as Name[]
            } as PokeApiSpecies;

            const expectedEnrichedPokemon: Pokemon = {
                name: 'Pidgeotto-2',
                id: 17,
                sprite: 'https://pokeapi.co/media/sprites/pokemon/17.png',
                catchRate: 21,
                shiny: false
            };
            
            jest.spyOn(global.Math, 'random').mockReturnValue(0.11);

            const result = enrichPokemonREST([pokemon, species]);

            expect(result).toEqual(expectedEnrichedPokemon);
        });
    });
    //#endregion

    //#region getPokemon
    xdescribe('getPokemon', () => {
        it('should fetch a random Pokemon and its species using REST requests', async () => {
            const expectedPokemon = {
                name: 'Pidgeotto',
                id: 17,
                sprites: {
                    front_shiny: 'https://pokeapi.co/media/sprites/pokemon/17-shiny.png',
                    front_default: 'https://pokeapi.co/media/sprites/pokemon/17.png',
                } as SpritesREST,
                species: {
                    name: '',
                    url: 'https://pokeapi.co/api/v2/pokemon-species/17/',
                },
            } as PokeApiPokemon;

            const expectedSpecies = {
                capture_rate: 45,
                names: [
                    {
                        name: 'Pidgeotto',
                        language: {
                            name: 'en',
                            url: ''
                        },
                    },
                ],
            } as PokeApiSpecies;

            jest.spyOn(global, 'fetch').mockResolvedValueOnce({ json: () => Promise.resolve(expectedPokemon) } as Response);
            jest.spyOn(global, 'fetch').mockResolvedValueOnce({ json: () => Promise.resolve(expectedSpecies) } as Response);

            const result = await getPokemon();

            expect(result).toEqual([expectedPokemon, expectedSpecies]);
            expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/17');
            expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/17/');
        });
    });
    //#endregion
});
