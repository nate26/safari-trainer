import React, { FC } from 'react';
import './PokeImg.css';
import { UseQueryResult } from '@tanstack/react-query';
import { Pokemon } from '../../../../interfaces/Pokemon.interface';
import PokeBallCapture from './PokeBallCapture/PokeBallCapture';
// import PokeBallCapture from './PokeBallCapture/PokeBallCapture';

interface PokeImgProps {
    response: UseQueryResult<Pokemon, Error>;
    ballShake: number | null;
}

const PokeImg: FC<PokeImgProps> = (props) => {
    if (props.response.isLoading) return (
        <div className="poke-img-area" data-testid="PokeImg">
            <p>Loading...</p>
        </div>
    );

    if (props.response.error) return (
        <div className="poke-img-area" data-testid="PokeImg">
            <p >An error has occurred: {props.response.error.message}</p>
        </div>
    );

    if (!props.response.data) return (
        <div className="poke-img-area" data-testid="PokeImg">
            <p>Pokemon Does Not Exist</p>
        </div>
    );


    const { name, shiny, sprite } = props.response.data;

    const article = ['a', 'e', 'i', 'o', 'u'].indexOf(name[0].toLowerCase()) >= 0 ? 'an' : 'a';

    const display = props.ballShake === null ?
        <img className="poke-img" src={sprite} data-testid="PokeImgImg" /> :
        <PokeBallCapture ballShake={props.ballShake} />;
    console.log(display)

    return (
        <div className="poke-img-area" data-testid="PokeImg">
            {display}
            <p className="poke-encounter-text" data-testid="PokeImgText">
                You have encountered {shiny ? 'a shiny' : article} <span className="poke-name" data-testid="PokeImgName">{name}</span>!
            </p>
        </div>
    );
};

export default PokeImg;
