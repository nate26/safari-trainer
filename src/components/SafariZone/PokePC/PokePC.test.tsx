import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokePC from './PokePC';
import { Pokemon } from '../../../interfaces/Pokemon.interface';

describe('<PokePC />', () => {

    test('it should mount', () => {
        // const pc = new Map<string, Pokemon[]>();
        render(<PokePC />);

        const pokePC = screen.getByTestId('PokePC');
        expect(pokePC).toBeInTheDocument();
    });

    test('display nothing if map is empty', () => {
        // const pc = new Map<string, Pokemon[]>();
        render(<PokePC />);

        const pokePCSlotImgs = screen.queryAllByTestId('PokePCSlotImg');
        const pokePCSlotNumbers = screen.queryAllByTestId('PokePCSlotNumber');
        expect(pokePCSlotImgs).toHaveLength(0);
        expect(pokePCSlotNumbers).toHaveLength(0);
    });

    test('display both images and placeholders from map', () => {
        const pc = new Map<string, Pokemon[]>();
        pc.set('1', [{ name: 'mew', shiny: false } as Pokemon]);
        pc.set('2', []);
        pc.set('3', []);
        render(<PokePC />);

        const pokePCSlotImgs = screen.queryAllByTestId('PokePCSlotImg');
        const pokePCSlotNumbers = screen.queryAllByTestId('PokePCSlotNumber');
        expect(pokePCSlotImgs).toHaveLength(1);
        expect(pokePCSlotNumbers).toHaveLength(2);
    });

    test('display a pokemon image priority of the first image if no shiny exists', () => {
        const pc = new Map<string, Pokemon[]>();
        pc.set('1', [
            { name: 'mew', shiny: false, sprite: 'first.png' } as Pokemon,
            { name: 'mew', shiny: false, sprite: 'second.png' } as Pokemon
        ]);
        render(<PokePC />);

        const pokePCImg = screen.getByTestId('PokePCImg');
        expect(pokePCImg).toHaveAttribute('src', 'first.png');
    });

    test('display a pokemon image priority of the second image if it is a SHINY', () => {
        const pc = new Map<string, Pokemon[]>();
        pc.set('1', [
            { name: 'mew', shiny: false, sprite: 'first.png' } as Pokemon,
            { name: 'mew', shiny: true, sprite: 'second.png' } as Pokemon
        ]);
        render(<PokePC />);

        const pokePCImg = screen.getByTestId('PokePCImg');
        expect(pokePCImg).toHaveAttribute('src', 'second.png');
    });

    test('display the count of a pokemon for one or multiple', () => {
        const pc = new Map<string, Pokemon[]>();
        pc.set('1', [
            { name: 'mew', shiny: false, sprite: 'first.png' } as Pokemon
        ]);
        render(<PokePC />);

        const pokePCCountOne = screen.getByTestId('PokePCCount');
        expect(pokePCCountOne).toHaveTextContent('1');

        cleanup();

        pc.set('1', [
            { name: 'mew', shiny: false, sprite: 'first.png' } as Pokemon,
            { name: 'mew', shiny: true, sprite: 'second.png' } as Pokemon
        ]);
        render(<PokePC />);

        const pokePCCountTwo = screen.getByTestId('PokePCCount');
        expect(pokePCCountTwo).toHaveTextContent('2');
    });

    test('display the poke ID if it is a placeholder', () => {
        const pc = new Map<string, Pokemon[]>();
        pc.set('123', []);
        render(<PokePC />);

        const pokePCSlotNumber = screen.getByTestId('PokePCSlotNumber');
        expect(pokePCSlotNumber).toHaveTextContent('123');
    });

});