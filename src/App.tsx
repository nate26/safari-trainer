import React = require('react');
import { FC } from 'react';
import './SafariZone.css';
import SafariZone from './components/SafariZone/SafariZone';

interface AppProps { }

const App: FC<AppProps> = () => (
    <div className="App" data-testid="App">
        <header className="App-window">
            <SafariZone />
        </header>
    </div>
);

export default App;
