import React, { FC } from 'react';
import './PokeCard.css';

interface PokeCardProps { }

const PokeCard: FC<PokeCardProps> = () => (
    <div className="/PokeCard" data-testid="PokeCard">
        PokeCard Component
    </div>
);

export default PokeCard;
