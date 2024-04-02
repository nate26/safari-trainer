import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokeBag from './PokeBag';
import { PokeBall } from '../../../enums/Pokeballs.enum';

describe('<PokeBag />', () => {

    test('it should mount', () => {
        // const bag = {
        //     pokeBalls: {
        //         pokeBalls: 82,
        //         greatBalls: 42,
        //         ultraBalls: 20,
        //         masterBalls: 0,
        //         repeatBalls: 0,
        //         timerBalls: 0
        //     }
        // } as Bag;
        const handleSelectedBall = () => { };
        render(<PokeBag selectedBall={null} handleSelectedBall={handleSelectedBall} />);

        const pokeBag = screen.getByTestId('PokeBag');
        expect(pokeBag).toBeInTheDocument();
    });

    test('only display pokeballs that exist', () => {
        // const bag = {
        //     pokeBalls: {
        //         pokeBalls: 82,
        //         greatBalls: 0,
        //         ultraBalls: 20,
        //         masterBalls: 1,
        //         repeatBalls: 10,
        //         timerBalls: 0
        //     }
        // } as Bag;
        const handleSelectedBall = () => { };
        render(<PokeBag selectedBall={null} handleSelectedBall={handleSelectedBall} />);

        const pokeBagBalls = screen.queryAllByTestId('PokeBagBall');
        expect(pokeBagBalls).toHaveLength(6);
        expect(pokeBagBalls[0]).toBeVisible();
        expect(pokeBagBalls[1]).not.toBeVisible();
        expect(pokeBagBalls[2]).toBeVisible();
        expect(pokeBagBalls[3]).toBeVisible();
        expect(pokeBagBalls[4]).toBeVisible();
        expect(pokeBagBalls[5]).not.toBeVisible();
    });

    test('select each kind of ball to pass up to parent', () => {
        // const bag = {
        //     pokeBalls: {
        //         pokeBalls: 82,
        //         greatBalls: 0,
        //         ultraBalls: 20,
        //         masterBalls: 1,
        //         repeatBalls: 10,
        //         timerBalls: 0
        //     }
        // } as Bag;
        let selectedBall: PokeBall | null = null;
        const handleSelectedBall = (ball: PokeBall) => selectedBall = ball;
        render(<PokeBag selectedBall={null} handleSelectedBall={handleSelectedBall} />);

        const pokeBagBalls = screen.queryAllByTestId('PokeBagBall');
        pokeBagBalls[0].click();
        expect(selectedBall).toBe(PokeBall.POKEBALL);
        pokeBagBalls[1].click();
        expect(selectedBall).toBe(PokeBall.GREATBALL);
        pokeBagBalls[2].click();
        expect(selectedBall).toBe(PokeBall.ULTRABALL);
        pokeBagBalls[3].click();
        expect(selectedBall).toBe(PokeBall.MASTERBALL);
        pokeBagBalls[4].click();
        expect(selectedBall).toBe(PokeBall.REPEATBALL);
        pokeBagBalls[5].click();
        expect(selectedBall).toBe(PokeBall.TIMERBALL);
    });

    test('select ball should be highlighted for each ball', () => {
        // const bag = {
        //     pokeBalls: {
        //         pokeBalls: 82,
        //         greatBalls: 31,
        //         ultraBalls: 20,
        //         masterBalls: 1,
        //         repeatBalls: 10,
        //         timerBalls: 1
        //     }
        // } as Bag;

        const convertClasses = (arr: HTMLElement[]) => arr.reduce((r, e, idx) => {
            r[idx] = e.className;
            return r;
        }, {} as ({ [idx: number]: string }));


        render(<PokeBag selectedBall={null} handleSelectedBall={() => { }} />);
        let pokeBagBallImgs = screen.queryAllByTestId('PokeBagBallImg');

        const rerender = (ball: PokeBall) => {
            cleanup();
            render(<PokeBag selectedBall={ball} handleSelectedBall={() => { }} />);
            pokeBagBallImgs = screen.queryAllByTestId('PokeBagBallImg');
        };

        // nothing selected
        expect(convertClasses(pokeBagBallImgs)).toEqual({ 0: 'item-img', 1: 'item-img', 2: 'item-img', 3: 'item-img', 4: 'item-img', 5: 'item-img' });

        // POKEBALL selected
        rerender(PokeBall.POKEBALL);
        expect(convertClasses(pokeBagBallImgs)).toEqual({ 0: 'item-img-selected', 1: 'item-img', 2: 'item-img', 3: 'item-img', 4: 'item-img', 5: 'item-img' });

        // GREATBALL selected
        rerender(PokeBall.GREATBALL);
        expect(convertClasses(pokeBagBallImgs)).toEqual({ 0: 'item-img', 1: 'item-img-selected', 2: 'item-img', 3: 'item-img', 4: 'item-img', 5: 'item-img' });

        // ULTRABALL selected
        rerender(PokeBall.ULTRABALL);
        expect(convertClasses(pokeBagBallImgs)).toEqual({ 0: 'item-img', 1: 'item-img', 2: 'item-img-selected', 3: 'item-img', 4: 'item-img', 5: 'item-img' });

        // MASTERBALL selected
        rerender(PokeBall.MASTERBALL);
        expect(convertClasses(pokeBagBallImgs)).toEqual({ 0: 'item-img', 1: 'item-img', 2: 'item-img', 3: 'item-img-selected', 4: 'item-img', 5: 'item-img' });

        // REPEATBALL selected
        rerender(PokeBall.REPEATBALL);
        expect(convertClasses(pokeBagBallImgs)).toEqual({ 0: 'item-img', 1: 'item-img', 2: 'item-img', 3: 'item-img', 4: 'item-img-selected', 5: 'item-img' });

        // TIMERBALL selected
        rerender(PokeBall.TIMERBALL);
        expect(convertClasses(pokeBagBallImgs)).toEqual({ 0: 'item-img', 1: 'item-img', 2: 'item-img', 3: 'item-img', 4: 'item-img', 5: 'item-img-selected' });
    });

    test('each pokeball should have the appropriate image', () => {
        // const bag = {
        //     pokeBalls: {
        //         pokeBalls: 82,
        //         greatBalls: 1,
        //         ultraBalls: 20,
        //         masterBalls: 1,
        //         repeatBalls: 10,
        //         timerBalls: 1
        //     }
        // } as Bag;
        const handleSelectedBall = () => { };
        render(<PokeBag selectedBall={null} handleSelectedBall={handleSelectedBall} />);

        const pokeBagBallImgs = screen.queryAllByTestId('PokeBagBallImg');
        expect(pokeBagBallImgs[0]).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png');
        expect(pokeBagBallImgs[1]).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png');
        expect(pokeBagBallImgs[2]).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png');
        expect(pokeBagBallImgs[3]).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png');
        expect(pokeBagBallImgs[4]).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/repeat-ball.png');
        expect(pokeBagBallImgs[5]).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png');
    });

    test('each pokeball should have the correct count displayed', () => {
        // const bag = {
        //     pokeBalls: {
        //         pokeBalls: 82,
        //         greatBalls: 31,
        //         ultraBalls: 20,
        //         masterBalls: 1,
        //         repeatBalls: 10,
        //         timerBalls: 12
        //     }
        // } as Bag;
        const handleSelectedBall = () => { };
        render(<PokeBag selectedBall={null} handleSelectedBall={handleSelectedBall} />);

        const pokeBagBallCounts = screen.queryAllByTestId('PokeBagBallCount');
        expect(pokeBagBallCounts[0]).toHaveTextContent('82');
        expect(pokeBagBallCounts[1]).toHaveTextContent('31');
        expect(pokeBagBallCounts[2]).toHaveTextContent('20');
        expect(pokeBagBallCounts[3]).toHaveTextContent('1');
        expect(pokeBagBallCounts[4]).toHaveTextContent('10');
        expect(pokeBagBallCounts[5]).toHaveTextContent('12');
    });

});