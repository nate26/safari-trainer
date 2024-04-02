import React, { FC } from 'react';
import './PokeBag.css';
import { Bag } from '../../../interfaces/Bag.interface';
import { PokeBall } from '../../../enums/Pokeballs.enum';
import { useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
interface PokeBagProps { selectedBall: PokeBall | null, handleSelectedBall: (selectedBall: PokeBall) => void }

const PokeBag: FC<PokeBagProps> = ({ selectedBall, handleSelectedBall }) => {

    const pokeBallClass = (ballType: PokeBall): string => {
        return selectedBall === ballType ? 'item-img-selected' : 'item-img';
    };

    const selectBall = (ballType: PokeBall): void => {
        handleSelectedBall(ballType);
    };

    const bag = useSelector((state: { bagReducer: Bag }) => state.bagReducer);

    // make this dynamic / component based
    return (
        <div className="poke-bag" data-testid="PokeBag">
            <div className="bag-slot" hidden={bag.pokeBalls === 0} onClick={() => selectBall(PokeBall.POKEBALL)} data-testid="PokeBagBall">
                <img className={pokeBallClass(PokeBall.POKEBALL)} title="Master Balls" data-testid="PokeBagBallImg"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'} />
                <div className="item-count" data-testid="PokeBagBallCount">{bag.pokeBalls}</div>
            </div>
            <div className="bag-slot" hidden={bag.greatBalls === 0} onClick={() => selectBall(PokeBall.GREATBALL)} data-testid="PokeBagBall">
                <img className={pokeBallClass(PokeBall.GREATBALL)} title="Master Balls" data-testid="PokeBagBallImg"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png'} />
                <div className="item-count" data-testid="PokeBagBallCount">{bag.greatBalls}</div>
            </div>
            <div className="bag-slot" hidden={bag.ultraBalls === 0} onClick={() => selectBall(PokeBall.ULTRABALL)} data-testid="PokeBagBall">
                <img className={pokeBallClass(PokeBall.ULTRABALL)} title="Master Balls" data-testid="PokeBagBallImg"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png'} />
                <div className="item-count" data-testid="PokeBagBallCount">{bag.ultraBalls}</div>
            </div>
            <div className="bag-slot" hidden={bag.masterBalls === 0} onClick={() => selectBall(PokeBall.MASTERBALL)} data-testid="PokeBagBall">
                <img className={pokeBallClass(PokeBall.MASTERBALL)} title="Master Balls" data-testid="PokeBagBallImg"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'} />
                <div className="item-count" data-testid="PokeBagBallCount">{bag.masterBalls}</div>
            </div>
            <div className="bag-slot" hidden={bag.repeatBalls === 0} onClick={() => selectBall(PokeBall.REPEATBALL)} data-testid="PokeBagBall">
                <img className={pokeBallClass(PokeBall.REPEATBALL)} title="Master Balls" data-testid="PokeBagBallImg"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/repeat-ball.png'} />
                <div className="item-count" data-testid="PokeBagBallCount">{bag.repeatBalls}</div>
            </div>
            <div className="bag-slot" hidden={bag.timerBalls === 0} onClick={() => selectBall(PokeBall.TIMERBALL)} data-testid="PokeBagBall">
                <img className={pokeBallClass(PokeBall.TIMERBALL)} title="Master Balls" data-testid="PokeBagBallImg"
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png'} />
                <div className="item-count" data-testid="PokeBagBallCount">{bag.timerBalls}</div>
            </div>
        </div>
    );
};

export default PokeBag;
