import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokeImg from './PokeImg';
import { UseQueryResult } from '@tanstack/react-query';
import { Pokemon } from '../../../../interfaces/Pokemon.interface';
import { convertHexToRGBA } from '../../../../util/HexConverter';

describe.only('<PokeImg />', () => {

    test('it should mount', () => {
        const data = {
            data: {
                name: 'test',
                sprite: 'pikachu.png',
                shiny: false
            }
        } as UseQueryResult<Pokemon, Error>;
        render(<PokeImg response={data} ballShake={null} />);

        const pokeImg = screen.getByTestId('PokeImg');
        expect(pokeImg).toBeInTheDocument();
    });

    test('load sprite as image', () => {
        const data = {
            data: {
                name: 'test',
                sprite: 'pikachu.png',
                shiny: false
            }
        } as UseQueryResult<Pokemon, Error>;
        render(<PokeImg response={data} ballShake={null} />);

        const pokeImgImg = screen.getByTestId('PokeImgImg');
        expect(pokeImgImg).toHaveAttribute('src', 'pikachu.png');
    });

    test('load encounter text if not shiny and not starting with an article', () => {
        const data = {
            data: {
                name: 'test',
                sprite: 'pikachu.png',
                shiny: false
            }
        } as UseQueryResult<Pokemon, Error>;
        render(<PokeImg response={data} ballShake={null} />);

        const pokeImgText = screen.getByTestId('PokeImgText');
        expect(pokeImgText).toHaveTextContent('You have encountered a test!');
    });

    test('load encounter text if it is a SHINY and not starting with an article', () => {
        const data = {
            data: {
                name: 'test',
                sprite: 'pikachu.png',
                shiny: true
            }
        } as UseQueryResult<Pokemon, Error>;
        render(<PokeImg response={data} ballShake={null} />);

        const pokeImgText = screen.getByTestId('PokeImgText');
        expect(pokeImgText).toHaveTextContent('You have encountered a shiny test!');
    });

    test('load encounter text if it is a SHINY and starts with an ARTICLE', () => {
        const data = {
            data: {
                name: 'Abra',
                sprite: 'pikachu.png',
                shiny: true
            }
        } as UseQueryResult<Pokemon, Error>;
        render(<PokeImg response={data} ballShake={null} />);

        const pokeImgText = screen.getByTestId('PokeImgText');
        expect(pokeImgText).toHaveTextContent('You have encountered a shiny Abra!');
    });

    test('load encounter text if not shiny and starts with any ARTICLE', () => {
        // a
        render(<PokeImg response={{ data: { name: 'Abra' } } as UseQueryResult<Pokemon, Error>} ballShake={null} />);
        expect(screen.getByTestId('PokeImgText')).toHaveTextContent('You have encountered an Abra!');
        // e
        cleanup();
        render(<PokeImg response={{ data: { name: 'Ekans' } } as UseQueryResult<Pokemon, Error>} ballShake={null} />);
        expect(screen.getByTestId('PokeImgText')).toHaveTextContent('You have encountered an Ekans!');
        // i
        cleanup();
        render(<PokeImg response={{ data: { name: 'Infernape' } } as UseQueryResult<Pokemon, Error>} ballShake={null} />);
        expect(screen.getByTestId('PokeImgText')).toHaveTextContent('You have encountered an Infernape!');
        // o
        cleanup();
        render(<PokeImg response={{ data: { name: 'Onix' } } as UseQueryResult<Pokemon, Error>} ballShake={null} />);
        expect(screen.getByTestId('PokeImgText')).toHaveTextContent('You have encountered an Onix!');
        // u
        cleanup();
        render(<PokeImg response={{ data: { name: 'Unknown' } } as UseQueryResult<Pokemon, Error>} ballShake={null} />);
        expect(screen.getByTestId('PokeImgText')).toHaveTextContent('You have encountered an Unknown!');
    });

    test('display pokemon name with a different color', () => {
        const data = {
            data: {
                name: 'Abra',
                sprite: 'pikachu.png',
                shiny: false
            }
        } as UseQueryResult<Pokemon, Error>;
        render(<PokeImg response={data} ballShake={null} />);

        const pokeImgText = screen.getByTestId('PokeImgText');
        expect(pokeImgText).toHaveStyle({ color: convertHexToRGBA('#d9d9d9') });
        const pokeImgName = screen.getByTestId('PokeImgName');
        expect(pokeImgName).toHaveStyle({ color: convertHexToRGBA('#ffb38d') });
    });

    test('display loading if no data has arrived yet', () => {
        const data = {
            isLoading: true
        } as UseQueryResult<Pokemon, Error>;
        render(<PokeImg response={data} ballShake={null} />);

        const pokeImg = screen.getByTestId('PokeImg');
        expect(pokeImg).toHaveTextContent('Loading...');
    });

    test('display error if api returns an error in response', () => {
        const data = {
            error: { message: 'some error' }
        } as UseQueryResult<Pokemon, Error>;
        render(<PokeImg response={data} ballShake={null} />);

        const pokeImg = screen.getByTestId('PokeImg');
        expect(pokeImg).toHaveTextContent('An error has occurred: some error');
    });

    test('display pokemon does not exist if there is no data and loading is done', () => {
        const data = {
            isLoading: false
        } as UseQueryResult<Pokemon, Error>;
        render(<PokeImg response={data} ballShake={null} />);

        const pokeImg = screen.getByTestId('PokeImg');
        expect(pokeImg).toHaveTextContent('Pokemon Does Not Exist');
    });

});