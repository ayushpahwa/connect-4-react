import { RESET_SCORE, SET_CONFIG, UPDATE_SCORE, UPDATE_TURN_ID } from './types';

export const setConfig = (payload) => {
    return {
        type: SET_CONFIG,
        payload
    }
}

export const updateScoresAction = (winnerId) => {
    return {
        type: UPDATE_SCORE,
        payload: { winnerId }
    }
}

export const resetScoresAction = () => {
    return {
        type: RESET_SCORE
    }
}

export const updateTurnIdAction = (payload) => {
    return {
        type: UPDATE_TURN_ID,
        payload
    }
}
