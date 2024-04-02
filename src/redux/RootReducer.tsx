import { combineReducers } from '@reduxjs/toolkit';

import { PokeBall } from '../enums/Pokeballs.enum';
import { Bag } from '../interfaces/Bag.interface';
import { Pokemon } from '../interfaces/Pokemon.interface';
import { PC } from '../interfaces/PC.interface';

export type StateType = {
    text: string;
};

const bagReducer = (bag: Bag, action: ({ type: string; data: Bag | PokeBall; })) => {
    const tempBag = structuredClone(bag); // eww
    switch (action.type) {
        case 'SET_BAG':
            return action.data; // temporary before using db
        case 'REMOVE_FROM_BAG':
            tempBag[action.data as PokeBall] = (bag[action.data as PokeBall] ?? 0) - 1;
            return tempBag;
        default:
            return bag ?? {};
    }
};

const pcReducer = (pc: PC, action: ({ type: string; data: PC | Pokemon; })) => {
    if (action.type === 'SET_PC') return action.data; // temporary before using db
    const defaultPC = pc ?? Array(152).fill([]) as PC;
    // if (['CAUGHT', 'RELEASE'].indexOf(action.type) === -1) {
    //     return defaultPC;
    // }
    const id = ((action.data as Pokemon ?? { id: 0 })?.id) ?? 0;
    let pokeArr = defaultPC[id];
    switch (action.type) {
        case 'CAUGHT':
            pokeArr = pokeArr ? [...pokeArr, action.data as Pokemon] : [action.data as Pokemon];
            break;
        case 'RELEASE':
            pokeArr = pokeArr.splice(pokeArr.indexOf(action.data as Pokemon), 1);
            break;
    }
    const newPC = [
        ...defaultPC.slice(0, id),
        pokeArr,
        ...defaultPC.slice(id + 1)
    ];
    return newPC;
};

export default combineReducers({ bagReducer, pcReducer });