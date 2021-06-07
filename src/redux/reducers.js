import { IMAGE_DATA } from '../constants';
import { RESET_SCORE, SET_CONFIG, UPDATE_SCORE, UPDATE_TURN_ID } from './types';

export const INITIAL_STATE = {
    'config': {
        'players': [
            {
                name: 'New Player 01',
                score: 0,
                avatar: IMAGE_DATA[0]
            },
            {
                name: 'New Player 02',
                score: 0,
                avatar: IMAGE_DATA[1]
            },
        ],
        numOfGames: 5,
        turnType: 'alternate',
    },
    'currentGame': {
        gameNumber: 0,
        lastStartingTurn: 1,
    }
};

const dataReducer = (state = INITIAL_STATE, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case SET_CONFIG:
            newState.config.players[0].name = action.payload.namePlayer01;
            newState.config.players[0].score = 0;
            newState.config.players[1].score = 0;
            newState.config.players[1].name = action.payload.namePlayer02;
            newState.config.numOfGames = action.payload.numOfGames;
            newState.config.turnType = action.payload.turnType;
            newState.currentGame.gameNumber = 0;
            break;
        case UPDATE_SCORE:
            newState.config.players[action.payload.winnerId - 1].score += 1;
            newState.currentGame.gameNumber += 1;
            break;
        case RESET_SCORE:
            newState.config.players[0].score = 0;
            newState.config.players[1].score = 0;
            newState.currentGame.gameNumber = 0;
            break;
        case UPDATE_TURN_ID:
            newState.currentGame.lastStartingTurn = action.payload;
            break;

        default:
    }
    return newState;
}

export default dataReducer;