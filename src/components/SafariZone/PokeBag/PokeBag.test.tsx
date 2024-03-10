import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokeBag from './PokeBag';

describe('<PokeBag />', () => {
    test('it should mount', () => {
        render(<PokeBag />);

        const pokeBag = screen.getByTestId('PokeBag');

        expect(pokeBag).toBeInTheDocument();
    });
});