import React, { FC } from 'react';
import './PokePC.css';
import { Pokemon } from '../../../interfaces/Pokemon.interface';
import { useSelector } from 'react-redux';
import { PC } from '../../../interfaces/PC.interface';

interface PokePCProps { }

const PokePC: FC<PokePCProps> = () => {
    const pc = useSelector((state: { pcReducer: PC }) => state.pcReducer);

    const getPriorityPokemon = (allPokemon: Pokemon[]) => {
        return allPokemon.find(pokemon => pokemon.shiny) ?? allPokemon[0];
    };
    return (
        <div className="poke-pc" data-testid="PokePC">
            {
                pc.map((species, idx) => species.length > 0 ?
                    (
                        <div key={idx} className="pc-poke-slot" data-testid="PokePCSlotImg">
                            <img className="pc-poke-img" data-testid="PokePCImg" src={getPriorityPokemon(species).sprite} />
                            <div className="pc-poke-count" data-testid="PokePCCount">{species.length}</div>
                        </div>
                    ) :
                    (
                        <div key={idx} className="pc-poke-slot" data-testid="PokePCSlotNumber">
                            {idx}
                        </div>
                    )
                )
            }
        </div>
    );
};

export default PokePC;
