import React, { FC } from 'react';
import './PokeImg.css';
import { UseQueryResult } from '@tanstack/react-query';
import { Pokemon } from '../../../../interfaces/Pokemon.interface';
// import PokeBallCapture from './PokeBallCapture/PokeBallCapture';

interface PokeImgProps { response: UseQueryResult<Pokemon, Error> }

const PokeImg: FC<PokeImgProps> = (props) => {
    if (props.response.isLoading) return (
        <p data-testid="PokeImg">Loading...</p>
    );

    if (props.response.error) return (
        <p data-testid="PokeImg">An error has occurred: {props.response.error.message}</p>
    );

    if (!props.response.data) return (
        <p data-testid="PokeImg">Pokemon Does Not Exist</p>
    );


    const { name, shiny, sprite } = props.response.data;

    const article = ['a', 'e', 'i', 'o', 'u'].indexOf(name[0].toLowerCase()) >= 0 ? 'an' : 'a';

    // if (Math.random() < 0.5) {
    // return (
    //     <PokeBallCapture />
    // )
    // }

    return (
        <div data-testid="PokeImg">
            <img className="poke-img" src={sprite} data-testid="PokeImgImg" />
            <p className="poke-encounter-text" data-testid="PokeImgText">
                You have encountered {shiny ? 'a shiny' : article} <span className="poke-name" data-testid="PokeImgName">{name}</span>!
            </p>
        </div>
    );
    // return (
    //     <div>
    //         <svg width="500px" height="500px" viewBox="0 0 500 500">
    //             <rect x="0" y="0" width="500" height="500" stroke="transparent" strokeWidth="1" />
    //             <circle cx="0" cy="50" r="15" fill="blue" stroke="transparent" strokeWidth="1">
    //                 <animateMotion path="M 0 0 H 500 Z" dur="3s" repeatCount="indefinite" />
    //             </circle>

    //             <circle id="rotatingBall" cx="0" cy="50" r="15" fill="green" stroke="transparent" strokeWidth="1" opacity="0.8"></circle>
    //             <animateTransform xlinkHref="#rotatingBall" attributeName="transform" begin="0s" dur="2s" type="rotate" from="0 20 20" to="360 100 60" repeatCount="indefinite" />
    //         </svg>
    //     </div>
    // );

};

export default PokeImg;
