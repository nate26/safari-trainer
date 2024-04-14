

import React from 'react';
import './ViewPokePopup.css';
import { Pokemon } from '../../../../interfaces/Pokemon.interface';
import { useDispatch, useSelector } from 'react-redux';

const ViewPokePopup: React.FC = () => {

    const dispatch = useDispatch();
    const selectedSpecies = useSelector((state: { viewSpeciesReducer: Pokemon[] }) => state.viewSpeciesReducer);

    const clearSelection = () => () => {
        dispatch({ type: 'SET_VIEW_SPECIES', data: [] });
    };

    if (!selectedSpecies || selectedSpecies.length === 0) {
        return null;
    }

    return (
        <div className="view-poke-popup" onClick={clearSelection()}>
            <h2>{selectedSpecies[0].name}</h2>
            <div className="view-poke-popup-species">
                {
                    selectedSpecies.map((pokemon, idx) => (
                        <div key={idx} className="view-poke" data-testid="pkm">
                            <img src={pokemon.sprite} alt={pokemon.name} data-testid="pkmSprite" />
                            <div data-testid="pkmShiny">{pokemon.shiny ? 'Shiny' : 'Not Shiny'}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ViewPokePopup;