import React, { FC } from 'react';
import './SafariZone.css';
import PokeCard from './PokeCard/PokeCard';

interface SafariZoneProps { }

const SafariZone: FC<SafariZoneProps> = () => (
    <div className="safari-zone" data-testid="SafariZone">
        <PokeCard />
    </div>
);

export default SafariZone;
