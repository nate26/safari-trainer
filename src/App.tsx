import React, { FC } from 'react';
import './App.css';
import SafariZone from './components/SafariZone/SafariZone';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

interface AppProps { }

const App: FC<AppProps> = () => (
    <div className="App" data-testid="App">
        <header className="App-window">
            <QueryClientProvider client={queryClient}>
                <SafariZone />
            </QueryClientProvider>
        </header>
    </div>
);

export default App;
