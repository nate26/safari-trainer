import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokeImg from './PokeImg';
import { UseQueryResult } from '@tanstack/react-query';
import { Pokemon } from '../../../../interfaces/pokemon.interface';

describe('<PokeImg />', () => {
    test('it should mount', () => {
        const data = {
            data: { name: 'test' }
        } as UseQueryResult<Pokemon, Error>;

        render(<PokeImg response={data} />);

        const pokeImg = screen.getByTestId('PokeImg');

        expect(pokeImg).toBeInTheDocument();
    });
});