import React, { FC } from 'react';
import './PokeBag.css';

interface PokeBagProps { }

const PokeBag: FC<PokeBagProps> = () => {

    return (
        <div className="poke-bag" data-testid="PokeBag">

        </div>
    );
};

export default PokeBag;
