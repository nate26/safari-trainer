import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokeCard from './PokeCard';

describe('<PokeCard />', () => {
    test('it should mount', () => {
        function handleCaughtPokemon() {}
        render(<PokeCard handleCaughtPokemon={handleCaughtPokemon} />);

        const pokeCard = screen.getByTestId('PokeCard');

        expect(pokeCard).toBeInTheDocument();
    });
});