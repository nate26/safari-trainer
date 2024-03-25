import { PokeBall } from '../enums/Pokeballs.enum';

export const removePokeball = (ballType: PokeBall) => {
    console.warn('removing pokeball ', ballType);
    return {
        type: 'REMOVE_POKEBALL',
        data: ballType
    };
};