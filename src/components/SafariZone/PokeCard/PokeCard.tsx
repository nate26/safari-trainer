import React, { FC, useState } from 'react';
import './PokeCard.css';
import { getPokemon } from '../../../api/pokeapi';
import { UseQueryResult } from '@tanstack/react-query';
import PokeImg from './PokeImg/PokeImg';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import { PokeBall } from '../../../enums/pokeballs.enum';

interface PokeCardProps {
    // eslint-disable-next-line no-unused-vars
    handleCaughtPokemon: (caughtPokemon: Pokemon) => void,
    handleUseBall: () => void,
    selectedBall: PokeBall | null
}

const PokeCard: FC<PokeCardProps> = ({ handleCaughtPokemon, handleUseBall, selectedBall }) => {

    const pokemon = getPokemon();
    const [response, setResponse] = useState<UseQueryResult<Pokemon, Error>>(pokemon);

    const [catchText, setCatchText] = useState('');
    const [catchTextFade, setCatchTextFade] = useState(false);

    let catchTextTimer: NodeJS.Timeout;

    const getBonusBall = () => {
        switch (selectedBall) {
            case PokeBall.POKEBALL:
                return 1;
            case PokeBall.GREATBALL:
                return 1.5;
            case PokeBall.ULTRABALL:
                return 2;
            case PokeBall.REPEATBALL:
                return 1; // calculate later
            case PokeBall.TIMERBALL:
                return 1; // calculate later
            default:
                return 1;
        }
    };

    const handleCatch = () => {
        if (!pokemon.data) return;

        const { name, catchRate } = pokemon.data;

        // safarizone catchrate
        const base = 12.75;
        const catchFactor = Math.max(Math.floor(catchRate / base), 1);
        const modCatchRate = catchFactor * base;

        // const shakeCheck = 65535;
        // const shakeProbability = Math.floor(1045860 / Math.floor(Math.sqrt(Math.floor(Math.sqrt(Math.floor(16711680 / catchRate))))));

        const baseChance = 1 / 3;
        const probabilityOfCapture = (1 - Math.pow(Math.E, Math.log(-(modCatchRate / 255) + 1))) * baseChance * getBonusBall();

        // const maxHealth = 1; // mock for now
        // const currentHealth = 1; // mock for now
        // const probabilityOfCapture = (((3 * maxHealth) - (2 * currentHealth)) / (3 * maxHealth)) * (catchRate / 255) * bonusBall;

        const chance = Math.random();
        // console.log(probabilityOfCapture, chance);
        if (probabilityOfCapture > chance || selectedBall === PokeBall.MASTERBALL) {
            setCatchText(name + ' was caught!');
            handleCaughtPokemon(pokemon.data);
            handleReRoll();
        }
        else {
            setCatchText(name + ' broke free!');
        }

        handleUseBall();

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
                <button className="poke-button" onClick={handleCatch} disabled={!selectedBall}>
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
