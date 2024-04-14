import React, { FC } from 'react';
import './PokePC.css';
import { Pokemon } from '../../../interfaces/Pokemon.interface';
import { useDispatch, useSelector } from 'react-redux';
import { PC } from '../../../interfaces/PC.interface';
import ViewPokePopup from './ViewPokePopup/ViewPokePopup';

interface PokePCProps { }

const PokePC: FC<PokePCProps> = () => {

    const dispatch = useDispatch();
    const pc = useSelector((state: { pcReducer: PC }) => state.pcReducer);

    const getPriorityPokemon = (allPokemon: Pokemon[]) => {
        return allPokemon.find(pokemon => pokemon.shiny) ?? allPokemon[0];
    };

    const displaySpecies = (idx: number) => () => {
        dispatch({ type: 'SET_VIEW_SPECIES', data: pc[idx] });
    };

    return (
        <div className="poke-pc" data-testid="PokePC">
            {
                pc.map((species, idx) => species.length > 0 ?
                    (
                        <div key={idx} className="pc-poke-slot-filled" data-testid="PokePCSlotImg" onClick={displaySpecies(idx)}>
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
            <ViewPokePopup />
        </div>
    );
};

export default PokePC;
