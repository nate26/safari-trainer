import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokeBag from './PokeBag';

describe('<PokeBag />', () => {
    test('it should mount', () => {
        const bag = {
            pokeBalls: {
                pokeBalls: 82,
                greatBalls: 42,
                ultraBalls: 20,
                masterBalls: 0,
                repeatBalls: 0,
                timerBalls: 0
            },
            battleItems: {
                escapeRopes: 0,
                soothBells: 0
            },
            pokeItems: {
                fireStones: 0,
                leafStones: 0,
                moonStones: 0,
                sunStones: 0,
                thunderStones: 0,
                waterStones: 0
            }
        }
        const handleSelectedBall = () => {};
        render(<PokeBag selectedBall={null} bag={bag} handleSelectedBall={handleSelectedBall} />);

        const pokeBag = screen.getByTestId('PokeBag');

        expect(pokeBag).toBeInTheDocument();
    });
});