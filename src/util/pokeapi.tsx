import { useQuery } from '@tanstack/react-query';
import { Pokemon } from '../interfaces/pokemon.interface';

export const MAX_POKEMON = 150; // 1024;

export function getPokemon() {
    const rand = Math.round(Math.random() * MAX_POKEMON) + 1;

    return useQuery<Pokemon>({
        queryKey: ['repoData'],
        queryFn: () => fetch('https://pokeapi.co/api/v2/pokemon/' + rand).then((res) => res.json())
    });
}
