import React, { FC, useState } from 'react';
import './SafariZone.css';
import PokeCard from './PokeCard/PokeCard';
import { Pokemon } from '../../interfaces/pokemon.interface';
import PokePC from './PokePC/PokePC';

interface SafariZoneProps { }

const SafariZone: FC<SafariZoneProps> = () => {

    const [pc, setPC] = useState(new Map<number, Pokemon>(Array(151).fill({}).map((v, idx) => [(idx + 1), v])));

    function handleCaughtPokemon(caughtPokemon: Pokemon) {
        setPC(new Map<number, Pokemon>(pc).set(caughtPokemon.id, caughtPokemon));
    }

    return (
        <div className="safari-zone" data-testid="SafariZone">
            <div></div>
            <div className="poke-card-window" data-testid="PokeCardWindow">
                <PokeCard handleCaughtPokemon={handleCaughtPokemon} />
            </div>
            <PokePC pc={pc} />
        </div>
    );
};

export default SafariZone;
