import avatar01 from './assets/avatar01.png'
import avatar02 from './assets/avatar02.png'
import run from './assets/run.png'
import winner from './assets/winner.png'

export const IMAGE_DATA = [avatar01,avatar02,run,winner];

export const numOfGamesList = [2, 3, 5, 10];

export const allTurnTypesList = {
    'alternate': ['Alternative Turn'],
    'looserFirst': ['Looser First'],
    'winnerFirst': ['Winner First'],
    'alwaysP1': ['Always Player 01'],
    'alwaysP2': ['Always Player 02'],
}

export const MODAL_SETTINGS_DEFAULT = {
    isOpen: false,
    inputType: 'name1'
}
export const MODAL_SETTINGS_NAME_INPUT_1 = {
    isOpen: true,
    inputType: 'name1'
}
export const MODAL_SETTINGS_NAME_INPUT_2 = {
    isOpen: true,
    inputType: 'name2'
}
export const MODAL_SETTINGS_GAMES_INPUT = {
    isOpen: true,
    inputType: 'game'
}
export const MODAL_SETTINGS_TURN_INPUT = {
    isOpen: true,
    inputType: 'turn'
}
export const MODAL_SETTINGS_CLOSE = {
    isOpen: false,
    inputType: "name1",
};
export const DEFAULT_MODAL_CONFIG = {
    title: "Hey there Pirate!",
    submitText: "Yep, that's me!",
    isNameType: false,
    isGameType: false,
    isTurnType: false,
};

export const TOTAL_ROWS = 8;
export const TOTAL_COLS = 8;
export const TOTAL_MATCHES_NEEDED = 4;
export const P1_COLOR = '#37AC5D';
export const P1_COLOR_BG = '#DCF6E4';
export const P2_COLOR = '#F8D146';
export const P2_COLOR_BG = '#F6EFD5';