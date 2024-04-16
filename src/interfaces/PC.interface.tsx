import { PokeLocation } from '../enums/PokeLocation.enum';
import { Pokemon } from './Pokemon.interface';

export type PokemonCaught = Pokemon & {
    captureDate: number;
    captureLocation: PokeLocation;
};

export type PC = PokemonCaught[][];
