import React, { FC, useState } from 'react';
import './PokeCard.css';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import { getPokemon } from '../../../util/pokeapi';
import { UseQueryResult } from '@tanstack/react-query';

const PokeCard: FC = () => {

    const pokemon = getPokemon();
    const [response, setResponse] = useState<UseQueryResult<Pokemon, Error>>(pokemon);

    return (
        <div className="PokeCard" data-testid="PokeCard">
            <PokeImg response={pokemon} />
            <button onClick={() => {
                response.refetch().then(response => setResponse(response));
            }}>
                Re-Roll
            </button>
        </div>
    );
};

function PokeImg({ response }: { response: UseQueryResult<Pokemon, Error> }) {

    if (response.isLoading) return (
        <p>Loading...</p>
    );

    if (response.error) return (
        <p>An error has occurred: {response.error.message}</p>
    );

    if (!response.data) return (
        <p>Pokemon Does Not Exist</p>
    );

    const pokemon = response.data;

    const article = ['a', 'e', 'i', 'o', 'u'].indexOf(pokemon.name[0]) >= 0 ? 'an' : 'a';
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    return (
        <div>
            <img className="poke-img" src={pokemon.sprites.front_default} />
            <p>You have encountered {article} <span className="poke-name">{name}</span>!</p>
        </div>
    );
}

export default PokeCard;
