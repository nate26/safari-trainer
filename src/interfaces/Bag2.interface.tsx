export interface Bag {
    pokeBalls: PokeBalls;
    battleItems: BattleItems;
    pokeItems: PokeItems;
}

export interface PokeBalls {
    pokeBalls: number;
    greatBalls: number;
    ultraBalls: number;
    masterBalls: number;
    repeatBalls: number;
    timerBalls: number;
}

export interface BattleItems {
    escapeRopes: number;
    soothBells: number;
}

export interface PokeItems {
    fireStones: number;
    leafStones: number;
    moonStones: number;
    sunStones: number;
    thunderStones: number;
    waterStones: number;
}