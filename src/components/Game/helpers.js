import { TOTAL_COLS, TOTAL_MATCHES_NEEDED, TOTAL_ROWS } from '../../constants';

export const updateGameArray = (state, action) => {
    let newState = Object.assign([], state);
    switch (action.type) {
        case 'ITEM_ADDED':

            newState[action.payload.firstEmptyRow][action.payload.colIndex] = action.payload.currentTurnId;
            break;

        case 'STEP_UNDO':
            newState[action.payload.row][action.payload.col] = 0;
            break;
        case 'RESET':
            newState = Object.assign([], resetArray());
            break;
        case 'GAME_WON':
            if (action.payload.length > 0) {
                action.payload.forEach(node => {
                    newState[node.row][node.col] += 2;
                });
            }
            break;
        default:
            break;
    }

    return newState;
}

export const updateHistoryArray = (state, action) => {
    let newState = Object.assign([], state);
    switch (action.type) {
        case 'ITEM_ADDED':
            newState.push({
                row: action.payload.firstEmptyRow,
                col: action.payload.colIndex,
                data: action.payload.currentTurnId
            })
            break;

        case 'STEP_UNDO':
            newState.pop();
            break;
        case 'RESET':
            newState = [];
            break;
        default:
            break;
    }

    return newState;
}

export const findFirstEmptyRow = (array, col) => {
    for (let index = 7; index >= 0; index--) {
        if (array[index][col] === 0) {
            return index;
        }
    }
    return -1;
}

export const getNextTurnType = (turnType, gameNumber, lastStartingTurn, winningTurn) => {
    let nextTurnId = 1;
    switch (turnType) {
        case 'alternate':
            if (gameNumber !== 0) {
                if (lastStartingTurn === 1) {
                    nextTurnId = 2;
                }
            }
            break;
        case 'looserFirst':
            if (gameNumber !== 0) {
                if (winningTurn === 1) {
                    nextTurnId = 2;
                }
            }
            break;
        case 'winnerFirst':
            if (gameNumber !== 0) {
                if (winningTurn === 2) {
                    nextTurnId = 2;
                }
            }
            break;
        case 'alwaysP1':
            nextTurnId = 1;
            break;
        case 'alwaysP2':
            nextTurnId = 2;
            break;

        default:
            break;
    }
    return nextTurnId;
}

export const resetArray = () => {
    let emptyArray = new Array(TOTAL_ROWS);
    for (let index = 0; index < TOTAL_ROWS; index++) {
        emptyArray[index] = new Array(TOTAL_COLS);
        emptyArray[index].fill(0);
    }
    return emptyArray;
}

export const checkGameState = (data, itemToFind, row, col) => {

    let i = 0, j = 0, counter = 0;
    let winningPath = [];
    const winTypes = [
        'Horizontal',
        'Vertical',
        'Right Diagonal',
        'Left Diagonal'
    ];
    let winTypeCounter = 0;


    // Checking for HORIZONTAL MATCHES

    // CHECKING ON LEFT SIDE
    counter = 1;
    i = row;
    j = col - 1;
    winTypeCounter = 0;
    while (j >= 0 && counter !== TOTAL_MATCHES_NEEDED) {
        if (data[i][j] === itemToFind) {
            counter++;
            winningPath.push({
                row: i,
                col: j--
            });
        } else {
            break;
        }
    }

    // CHECKING ON RIGHT SIDE
    if (counter !== TOTAL_MATCHES_NEEDED) {
        // No more matches on left!
        j = col + 1;
        while (j < TOTAL_COLS && counter !== TOTAL_MATCHES_NEEDED) {
            if (data[i][j] === itemToFind) {
                counter++;
                winningPath.push({
                    row: i,
                    col: j++
                });
            } else {
                break;
            }
        }
    }

    // CHECKING ON BOTTOM
    if (counter !== TOTAL_MATCHES_NEEDED) {
        // No more matches on right!

        // Trying for vertical matches
        counter = 1;
        i = row - 1;
        j = col;
        winningPath = [];
        winTypeCounter = 1;
        while (i >= 0 && counter !== TOTAL_MATCHES_NEEDED) {
            if (data[i][j] === itemToFind) {
                counter++;
                winningPath.push({
                    row: i--,
                    col: j
                });
            } else {
                break;
            }
        }
    }

    // CHECKING ON TOP
    if (counter !== TOTAL_MATCHES_NEEDED) {
        // No more matches on bottom!
        i = row + 1;
        while (i < TOTAL_ROWS && counter !== TOTAL_MATCHES_NEEDED) {
            if (data[i][j] === itemToFind) {
                counter++;
                winningPath.push({
                    row: i++,
                    col: j
                });
            } else {
                break;
            }
        }
    }

    // CHECKING ON RIGHT DIAGONAL BOTTOM
    if (counter !== TOTAL_MATCHES_NEEDED) {
        // No more matches on top!

        // Trying for RIGHT DIAGONAL matches
        /**
         *    /
         *   /
         *  /
         * /
         * RIGHT DIAGONAL
         */
        counter = 1;
        i = row + 1;
        j = col - 1;
        winningPath = [];
        winTypeCounter = 2;
        while (i < TOTAL_ROWS && j >= 0 && counter !== TOTAL_MATCHES_NEEDED) {
            if (data[i][j] === itemToFind) {
                counter++;
                winningPath.push({
                    row: i++,
                    col: j--
                });
            } else {
                break;
            }
        }
    }

    // CHECKING ON RIGHT DIAGONAL TOP
    if (counter !== TOTAL_MATCHES_NEEDED) {
        // No more matches on rd top!
        i = row - 1;
        j = col + 1;
        while (i >= 0 && j < TOTAL_COLS && counter !== TOTAL_MATCHES_NEEDED) {
            if (data[i][j] === itemToFind) {
                counter++;
                winningPath.push({
                    row: i--,
                    col: j++
                });
            } else {
                break;
            }
        }
    }

    // CHECKING ON LEFT DIAGONAL BOTTOM
    if (counter !== TOTAL_MATCHES_NEEDED) {
        // No more matches on rd bottom!

        // Trying for LEFT DIAGONAL matches
        /**
         * \
         *  \
         *   \
         *    \
         * LEFT DIAGONAL
         */
        counter = 1;
        i = row + 1;
        j = col + 1;
        winningPath = [];
        winTypeCounter = 3;
        while (i < TOTAL_ROWS && j < TOTAL_COLS && counter !== TOTAL_MATCHES_NEEDED) {
            if (data[i][j] === itemToFind) {
                counter++;
                winningPath.push({
                    row: i++,
                    col: j++
                });
            } else {
                break;
            }
        }
    }

    // CHECKING ON LEFT DIAGONAL TOP
    if (counter !== TOTAL_MATCHES_NEEDED) {
        // No more matches on ld bottom!
        i = row - 1;
        j = col - 1;
        while (i >= 0 && j >= 0 && counter !== TOTAL_MATCHES_NEEDED) {
            if (data[i][j] === itemToFind) {
                counter++;
                winningPath.push({
                    row: i--,
                    col: j--
                });
            } else {
                break;
            }
        }
    }

    if (counter === TOTAL_MATCHES_NEEDED) {
        winningPath.push({ row, col });
        return {
            win: true,
            winningPath,
            winType: winTypes[winTypeCounter]
        };
    } else {
        // No more matches on ld bottom!
        return { win: false };
    }
}