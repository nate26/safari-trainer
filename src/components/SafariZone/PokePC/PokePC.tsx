import React, { FC } from 'react';
import './PokePC.css';
import { Pokemon } from '../../../interfaces/pokemon.interface';

interface PokePCProps { pc: Map<number, Pokemon> }

const PokePC: FC<PokePCProps> = ({ pc }) => {
    return (
        <div className="poke-pc" data-testid="PokePC">
            {
                Array.from(pc.entries())
                    .map(([id, pokemon]) => pokemon?.sprites ? 
                        (<img key={id} className="pc-poke-img" src={pokemon.sprites.front_default} />) :
                        (<div key={id} className="pc-poke-img">{id}</div>)
                    )
            }
        </div>
    );
};

export default PokePC;
