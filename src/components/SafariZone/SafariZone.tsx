import React, { FC, useEffect, useRef, useState } from 'react';
import './SafariZone.css';
import PokeCard from './PokeCard/PokeCard';
import PokePC from './PokePC/PokePC';
import { Pokemon } from '../../interfaces/Pokemon.interface';
import PokeBag from './PokeBag/PokeBag';
import { PokeBall } from '../../enums/Pokeballs.enum';
import { Bag } from '../../interfaces/Bag.interface';
import { useDispatch, useSelector } from 'react-redux';
import { PC } from '../../interfaces/PC.interface';

interface SafariZoneProps { }

const SafariZone: FC<SafariZoneProps> = () => {

    const dispatch = useDispatch();

    const bag = useSelector((state: { bagReducer: Bag }) => state.bagReducer);
    const pc = useSelector((state: { pcReducer: PC }) => state.pcReducer);

    const [selectedBall, setSelectedBall] = useState<PokeBall | null>(null);

    useEffect(() => {
        dispatch({
            type: 'SET_BAG', data: {
                pokeBalls: 82,
                greatBalls: 42,
                ultraBalls: 20,
                masterBalls: 1,
                repeatBalls: 0,
                timerBalls: 0
            }
        });
    }, []);

    const loadButtonRef = useRef<HTMLInputElement>(null);

    const handleCaughtPokemon = (caughtPokemon: Pokemon) => {
        dispatch({ type: 'CAUGHT', data: caughtPokemon });
    };

    const handleSelectedBall = (selectedBall: PokeBall) => {
        setSelectedBall(selectedBall);
    };

    const handleUseBall = () => {
        if (!selectedBall) return;
        if ((bag[selectedBall] ?? 0) - 1 <= 0) setSelectedBall(null);
        dispatch({ type: 'REMOVE_FROM_BAG', data: selectedBall });
    };

    const saveGame = () => {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(pc));
        const dlAnchorElem = document.getElementById('saveGameEl')!;
        dlAnchorElem.setAttribute('href', dataStr);
        dlAnchorElem.setAttribute('download', `Safari_Zone_Save_(${new Date().toLocaleString().replace(/ /gi, '')}).json`);
        dlAnchorElem.click();
    };

    const loadGame = () => {
        loadButtonRef.current?.click();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadGameFile = (e: any) => {
        const fileReader = new FileReader();
        const blob = e.target.files[0];
        if (!blob) return;
        fileReader.readAsText(blob, 'UTF-8');
        fileReader.onload = e => {
            const data = e.target?.result as string;
            // TODO: more validations
            if (data) {
                const parsedData: PC = JSON.parse(data);
                dispatch({ type: 'SET_PC', data: parsedData });
            }
        };
    };

    return (
        <div className="safari-zone" data-testid="SafariZone">
            <a id="saveGameEl" style={{ 'display': 'none' }}></a>
            <div className="header-buttons">
                <button className="poke-button" onClick={saveGame}>Save Game</button>
                <button className="poke-button" onClick={loadGame}>Load Game</button>
                <input type="file" onChange={uploadGameFile} ref={loadButtonRef} hidden />
            </div>
            <div></div>
            <div className="poke-card-window" data-testid="PokeCardWindow">
                <PokeCard handleCaughtPokemon={handleCaughtPokemon} handleUseBall={handleUseBall} selectedBall={selectedBall} />
                <PokeBag selectedBall={selectedBall} handleSelectedBall={handleSelectedBall} />
            </div>
            <PokePC />
        </div>
    );
};

export default SafariZone;
