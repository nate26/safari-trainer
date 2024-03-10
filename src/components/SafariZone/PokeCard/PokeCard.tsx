import React, { FC, useState } from 'react';
import './PokeCard.css';
import { getPokemon } from '../../../api/pokeapi';
import { UseQueryResult } from '@tanstack/react-query';
import PokeImg from './PokeImg/PokeImg';
import { Pokemon } from '../../../interfaces/pokemon.interface';

// eslint-disable-next-line no-unused-vars
interface PokeCardProps { handleCaughtPokemon: (caughtPokemon: Pokemon) => void }

const PokeCard: FC<PokeCardProps> = ({ handleCaughtPokemon }) => {

    const pokemon = getPokemon();
    const [response, setResponse] = useState<UseQueryResult<Pokemon, Error>>(pokemon);

    const [catchText, setCatchText] = useState('');
    const [catchTextFade, setCatchTextFade] = useState(false);

    let catchTextTimer: NodeJS.Timeout;

    const handleCatch = () => {
        if (!pokemon.data) return;
        
        const { name, catchRate } = pokemon.data;

        const base = 12.75;
        const catchFactor = Math.max(Math.floor(catchRate / base), 1);
        const modCatchRate = catchFactor * base;

        // const shakeCheck = 65535;
        // const shakeProbability = Math.floor(1045860 / Math.floor(Math.sqrt(Math.floor(Math.sqrt(Math.floor(16711680 / catchRate))))));

        const baseChance = 1 / 3;
        const probabilityOfCapture = (1 - Math.pow(Math.E, Math.log(-(modCatchRate / 255) + 1))) * baseChance;

        const chance = Math.random();
        // console.log(probabilityOfCapture, chance);
        if (probabilityOfCapture > chance) {
            setCatchText(name + ' was caught!');
            handleCaughtPokemon(pokemon.data);
            handleReRoll();
        }
        else {
            setCatchText(name + ' broke free!');
        }

        if (catchTextTimer) {
            clearTimeout(catchTextTimer);
        }
        setCatchTextFade(false);
        catchTextTimer = setTimeout(() => {
            setCatchTextFade(true); // start fade out
        }, 800);
    };

    const handleReRoll = () => {
        response.refetch()
            .then(response => setResponse(response))
            .catch(err => console.error('could not refetch data', err));
    };

    return (
        <div className="PokeCard" data-testid="PokeCard">
            <p className={`${catchTextFade ? 'fadeout' : ''}`} style={{ 'height': '47px' }}>{catchText}</p>
            <PokeImg response={pokemon} />
            <div className="poke-button-area">
                <button className="poke-button" onClick={handleCatch}>
                    Catch
                </button>
                <button className="poke-button" onClick={handleReRoll}>
                    Run
                </button>
            </div>
        </div>
    );
};

export default PokeCard;
