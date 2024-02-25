import React, { FC, useState } from 'react';
import './PokeCard.css';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import { getPokemon } from '../../../util/pokeapi';
import { UseQueryResult } from '@tanstack/react-query';
import PokeImg from './PokeImg/PokeImg';

const PokeCard: FC = () => {

    const pokemon = getPokemon();
    const [response, setResponse] = useState<UseQueryResult<Pokemon, Error>>(pokemon);

    const handleCatch = () => {
        const base = 12.75;
        const catchFactor = Math.max(Math.floor(255 / base), 1);
        const catchRate = catchFactor * base;

        // const shakeCheck = 65535;
        // const shakeProbability = Math.floor(1045860 / Math.floor(Math.sqrt(Math.floor(Math.sqrt(Math.floor(16711680 / catchRate))))));

        const baseChance = 1 / 3;
        const probabilityOfCapture = (1 - Math.pow(Math.E, Math.log(-(catchRate / 255) + 1))) * baseChance;

        const chance = Math.random();
        console.log(probabilityOfCapture, chance);
        if (probabilityOfCapture > chance) {
            console.log('CAUGHT');
            handleReRoll();
        }
    };

    const handleReRoll = () => {
        response.refetch()
            .then(response => setResponse(response))
            .catch(err => console.error('could not refetch data', err));
    };

    return (
        <div className="PokeCard" data-testid="PokeCard">
            <PokeImg response={pokemon} />
            <div className="poke-button-area">
                <button onClick={handleCatch}>
                    Catch
                </button>
                <button onClick={handleReRoll}>
                    Re-Roll
                </button>
            </div>
        </div>
    );
};

export default PokeCard;
