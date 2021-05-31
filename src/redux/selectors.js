import { INITIAL_STATE } from './reducers'

export const getCurrentConfig = (state) => {
    let configData = state.data.config;
    if (!configData) {
        configData = INITIAL_STATE.config;
    }
    const config = {
        namePlayer01: configData.players[0].name,
        namePlayer02: configData.players[1].name,
        numOfGames: configData.numOfGames,
        turnType: configData.turnType,
    }
    return config;
}

export const getPlayerInfo = (state) => {
    return { players: state.data.config.players };
}

export const getGameInfo = (state) => {
    return {
        gameNumber: state.data.currentGame.gameNumber,
        lastStartingTurn: state.data.currentGame.lastStartingTurn,
        numOfGames: state.data.config.numOfGames,
        turnType: state.data.config.turnType,
    };
}