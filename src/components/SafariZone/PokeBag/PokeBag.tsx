import React, { FC } from 'react';
import './PokeBag.css';
import { Bag } from '../../../interfaces/bag.interface';
import { PokeBall } from '../../../enums/pokeballs.enum';

// eslint-disable-next-line no-unused-vars
interface PokeBagProps { selectedBall: PokeBall | null, bag: Bag, handleSelectedBall: (selectedBall: PokeBall) => void }

const PokeBag: FC<PokeBagProps> = ({ selectedBall, bag, handleSelectedBall }) => {

    const pokeBallClass = (ballType: PokeBall): string => {
        return selectedBall === ballType ? 'item-img-selected' : 'item-img';
    };

    const selectBall = (ballType: PokeBall): void => {
        handleSelectedBall(ballType);
    };

    return (
        <div className="poke-bag" data-testid="PokeBag">
            <div className="bag-slot" hidden={bag.pokeBalls.pokeBalls === 0} onClick={() => selectBall(PokeBall.POKEBALL)}>
                <img className={pokeBallClass(PokeBall.POKEBALL)} title="Master Balls"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'} />
                <div className="item-count">{bag.pokeBalls.pokeBalls}</div>
            </div>
            <div className="bag-slot" hidden={bag.pokeBalls.greatBalls === 0} onClick={() => selectBall(PokeBall.GREATBALL)}>
                <img className={pokeBallClass(PokeBall.GREATBALL)} title="Master Balls"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png'} />
                <div className="item-count">{bag.pokeBalls.greatBalls}</div>
            </div>
            <div className="bag-slot" hidden={bag.pokeBalls.ultraBalls === 0} onClick={() => selectBall(PokeBall.ULTRABALL)}>
                <img className={pokeBallClass(PokeBall.ULTRABALL)} title="Master Balls"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png'} />
                <div className="item-count">{bag.pokeBalls.ultraBalls}</div>
            </div>
            <div className="bag-slot" hidden={bag.pokeBalls.masterBalls === 0} onClick={() => selectBall(PokeBall.MASTERBALL)}>
                <img className={pokeBallClass(PokeBall.MASTERBALL)} title="Master Balls"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'} />
                <div className="item-count">{bag.pokeBalls.masterBalls}</div>
            </div>
            <div className="bag-slot" hidden={bag.pokeBalls.repeatBalls === 0} onClick={() => selectBall(PokeBall.REPEATBALL)}>
                <img className={pokeBallClass(PokeBall.REPEATBALL)} title="Master Balls"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/repeat-ball.png'} />
                <div className="item-count">{bag.pokeBalls.repeatBalls}</div>
            </div>
            <div className="bag-slot" hidden={bag.pokeBalls.timerBalls === 0} onClick={() => selectBall(PokeBall.TIMERBALL)}>
                <img className={pokeBallClass(PokeBall.TIMERBALL)} title="Master Balls"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png'} />
                <div className="item-count">{bag.pokeBalls.timerBalls}</div>
            </div>
        </div>
    );
};

export default PokeBag;
