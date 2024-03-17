import React, { FC, useState } from 'react';
import './PokeCard.css';
import { getPokemon } from '../../../api/Pokeapi';
import { useQuery } from '@tanstack/react-query';
import PokeImg from './PokeImg/PokeImg';
import { Pokemon } from '../../../interfaces/Pokemon.interface';
import { PokeBall } from '../../../enums/Pokeballs.enum';

interface PokeCardProps {
    // eslint-disable-next-line no-unused-vars
    handleCaughtPokemon: (caughtPokemon: Pokemon) => void,
    handleUseBall: () => void,
    selectedBall: PokeBall | null
}

const PokeCard: FC<PokeCardProps> = ({ handleCaughtPokemon, handleUseBall, selectedBall }) => {

    const response = useQuery<Pokemon>({
        queryKey: ['repoData'],
        queryFn: () => getPokemon(),
        staleTime: Infinity
    });

    const [ballShake, setBallShake] = useState<number | null>(null);

    const [catchText, setCatchText] = useState('');
    const [catchTextFade, setCatchTextFade] = useState(false);

    const [catching, setCatching] = useState(false);

    let caughtTimer: NodeJS.Timeout;
    let rerollTimer: NodeJS.Timeout;
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

    const fadeOutText = () => {
        if (catchTextTimer) clearTimeout(catchTextTimer);
        setCatchTextFade(false);
        catchTextTimer = setTimeout(() => {
            setCatchTextFade(true); // start fade out
        }, 800);
    };

    const handleCatch = () => {
        if (!response.data) return;

        const { name, catchRate } = response.data;

        // safarizone catchrate
        const base = 12.75;
        const catchFactor = Math.max(Math.floor(catchRate / base), 1);
        const modCatchRate = catchFactor * base;

        const baseChance = 1 / 3;
        const probabilityOfCapture = (1 - Math.pow(Math.E, Math.log(-(modCatchRate / 255) + 1))) * baseChance * getBonusBall();

        // const maxHealth = 1; // mock for now
        // const currentHealth = 1; // mock for now
        // const probabilityOfCapture = (((3 * maxHealth) - (2 * currentHealth)) / (3 * maxHealth)) * (catchRate / 255) * bonusBall;

        // todo: cleanup conditions

        const chance = Math.random();
        const ballShakes = selectedBall === PokeBall.MASTERBALL ? 4 : Math.floor((probabilityOfCapture - chance) * 4 + 4);

        setCatching(true);

        // weird timeouts... probably should use a promise chain or rxjs-react
        if (probabilityOfCapture > chance || selectedBall === PokeBall.MASTERBALL) {
            if (caughtTimer) clearTimeout(caughtTimer);
            caughtTimer = setTimeout(() => {
                setCatchText(name + ' was caught!');
                fadeOutText();
                handleCaughtPokemon(response.data);
                if (rerollTimer) clearTimeout(rerollTimer);
                rerollTimer = setTimeout(() => {
                    handleReRoll();
                    setBallShake(null);
                    setCatching(false);
                }, 1000);
            }, 3500);
        }
        else {
            if (caughtTimer) clearTimeout(caughtTimer);
            caughtTimer = setTimeout(() => {
                setCatchText(name + ' broke free!');
                fadeOutText();
                setBallShake(null);
                setCatching(false);
            }, ballShakes * 1000 + 500);
        }

        setBallShake(ballShakes);
        handleUseBall();
    };

    const handleReRoll = () => {
        response.refetch();
    };

    return (
        <div className="PokeCard" data-testid="PokeCard">
            <p className={`${catchTextFade ? 'fadeout' : ''}`} style={{ 'height': '47px' }}>{catchText}</p>
            <PokeImg response={response} ballShake={ballShake} />
            <div className="poke-button-area">
                <button className="poke-button" onClick={handleCatch} disabled={!selectedBall || catching}>
                    Catch
                </button>
                <button className="poke-button" onClick={handleReRoll} disabled={catching}>
                    Run
                </button>
            </div>
        </div>
    );
};

export default PokeCard;
