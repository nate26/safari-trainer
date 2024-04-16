
import React from 'react';
import { render } from '@testing-library/react';
import ViewPokePopup from './ViewPokePopup';
import { Pokemon } from '../../../../interfaces/Pokemon.interface';
import { useDispatch } from 'react-redux';

describe('ViewPokePopup', () => {

    it('renders a list of 3 Pokemon', () => {
        const selectedSpecies: Pokemon[] = [
            { name: 'Pikachu', sprite: 'pikachu.png', shiny: false, id: 1, catchRate: 0.5 },
            { name: 'Charizard', sprite: 'charizard.png', shiny: false, id: 2, catchRate: 0.5 },
            { name: 'Bulbasaur', sprite: 'bulbasaur.png', shiny: false, id: 3, catchRate: 0.5 }
        ];

        useDispatch()({ type: 'SET_VIEW_SPECIES', data: selectedSpecies });

        const { getAllByTestId } = render(
            <ViewPokePopup />
        );

        expect(getAllByTestId('pkm').length).toBe(3);
        expect(getAllByTestId('pkmSprite')).toEqual(['pikachu.png', 'charizard.png', 'bulbasaur.png']);
    });

    it('renders a list of 3 Pokemon with or without shiny', () => {
        const selectedSpecies: Pokemon[] = [
            { name: 'Pikachu', sprite: 'pikachu.png', shiny: false, id: 1, catchRate: 0.5 },
            { name: 'Charizard', sprite: 'charizard.png', shiny: true, id: 2, catchRate: 0.5 },
            { name: 'Bulbasaur', sprite: 'bulbasaur.png', shiny: false, id: 3, catchRate: 0.5 }
        ];

        useDispatch()({ type: 'SET_VIEW_SPECIES', data: selectedSpecies });

        const { getAllByTestId } = render(
            <ViewPokePopup />
        );

        expect(getAllByTestId('pkmShiny')).toEqual(['Not Shiny', 'Shiny', 'Not Shiny']);
    });

});
