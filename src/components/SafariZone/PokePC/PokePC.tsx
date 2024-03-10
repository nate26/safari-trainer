import React, { FC } from 'react';
import './PokePC.css';
import { Pokemon } from '../../../interfaces/pokemon.interface';

interface PokePCProps { pc: Map<string, Pokemon[]> }

const PokePC: FC<PokePCProps> = ({ pc }) => {
    const getPriorityPokemon = (allPokemon: Pokemon[]) => {
        return allPokemon.find(pokemon => pokemon.shiny) ?? allPokemon[0];
    }
    return (
        <div className="poke-pc" data-testid="PokePC">
            {
                Array.from(pc.entries())
                    .map(([id, allPokemon]) => allPokemon.length > 0 ? 
                        (
                            <div key={id} className="pc-poke-slot">
                                <img className="pc-poke-img" src={getPriorityPokemon(allPokemon).sprite} />
                                <div className="pc-poke-count">{allPokemon.length}</div>
                            </div>
                        ) :
                        (
                            <div key={id} className="pc-poke-slot">
                                {id}
                            </div>
                        )
                    )
            }
        </div>
    );
};

export default PokePC;
