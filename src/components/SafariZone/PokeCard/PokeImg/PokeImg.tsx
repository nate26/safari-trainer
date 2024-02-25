import React, { FC } from 'react';
import './PokeImg.css';
import { UseQueryResult } from '@tanstack/react-query';
import { Pokemon } from '../../../../interfaces/pokemon.interface';

interface PokeImgProps { response: UseQueryResult<Pokemon, Error> }

const PokeImg: FC<PokeImgProps> = (props) => {
    if (props.response.isLoading) return (
        <p>Loading...</p>
    );

    if (props.response.error) return (
        <p>An error has occurred: {props.response.error.message}</p>
    );

    if (!props.response.data) return (
        <p>Pokemon Does Not Exist</p>
    );

    const pokemon = props.response.data;

    const article = ['a', 'e', 'i', 'o', 'u'].indexOf(pokemon.name[0]) >= 0 ? 'an' : 'a';
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    return (
        <div>
            <img className="poke-img" src={pokemon.sprites.front_default} />
            <p>You have encountered {article} <span className="poke-name">{name}</span>!</p>
        </div>
    );
};

export default PokeImg;
