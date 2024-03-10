import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokePC from './PokePC';
import { Pokemon } from '../../../interfaces/pokemon.interface';

describe('<PokePC />', () => {
    test('it should mount', () => {
        const pc = new Map<string, Pokemon[]>();
        render(<PokePC pc={pc} />);

        const pokePC = screen.getByTestId('PokePC');

        expect(pokePC).toBeInTheDocument();
    });
});