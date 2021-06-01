import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Grid } from 'semantic-ui-react';
import { resetScoresAction, updateScoresAction, updateTurnIdAction } from '../../redux/actions';
import { getGameInfo, getPlayerInfo } from '../../redux/selectors';
import './Game.css';
import { GameInfo } from './GameInfo';
import { checkGameState, findFirstEmptyRow, getNextTurnType, resetArray, updateGameArray, updateHistoryArray } from './helpers';
import { Item } from './Item';

const Game = ({ players, gameInfoObj, updateScores, updateCurrentTurnId, resetScores }) => {


    let [gameArray, dispatchUpdateGameArray] = useReducer(updateGameArray, resetArray());
    let [currentTurnId, setCurrentTurnId] = useState(1);
    let [stepHistory, dispatchUpdateStepHistory] = useReducer(updateHistoryArray, []);
    let [isGameOver, setIsGameOver] = useState(false);
    let [isTournamentOver, setIsTournamentOver] = useState(false);
    useEffect(() => {
        let nextTurnId = 1;
        nextTurnId = getNextTurnType(gameInfoObj.turnType, gameInfoObj.gameNumber, gameInfoObj.lastStartingTurn, currentTurnId);
        updateCurrentTurnId(nextTurnId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let handleItemClick = (colIndex) => {
        if (!isGameOver) {
            let firstEmptyRow = findFirstEmptyRow(gameArray, colIndex);
            if (firstEmptyRow !== -1) {

                dispatchUpdateGameArray({
                    type: 'ITEM_ADDED', payload: {
                        firstEmptyRow,
                        colIndex,
                        currentTurnId
                    }
                });

                dispatchUpdateStepHistory({
                    type: 'ITEM_ADDED', payload: {
                        firstEmptyRow,
                        colIndex,
                        currentTurnId
                    }
                });
                let gameOutput = checkGameState(gameArray, currentTurnId, firstEmptyRow, colIndex);
                if (!gameOutput.win) {
                    let newCurrentId = 1;
                    if (currentTurnId === 1) {
                        newCurrentId = 2;
                    }
                    setCurrentTurnId(newCurrentId);
                } else {
                    dispatchUpdateGameArray({ type: 'GAME_WON', payload: gameOutput.winningPath })
                    setIsGameOver(true);
                    runPostGameAnalysis();
                }
            }
        }
    }

    let handleUndo = () => {
        if (stepHistory.length > 0) {
            dispatchUpdateGameArray({
                type: 'STEP_UNDO',
                payload: stepHistory[stepHistory.length - 1]
            });
            dispatchUpdateStepHistory({
                type: 'STEP_UNDO'
            });
            let newCurrentId = 1;
            if (currentTurnId === 1) {
                newCurrentId = 2;
            }
            setCurrentTurnId(newCurrentId);
        }

    }

    let handleNextGameClick = () => {
        dispatchUpdateGameArray({ type: 'RESET' });
        dispatchUpdateStepHistory({ type: 'RESET' });
        if (isTournamentOver) {
            resetScores();
            setIsTournamentOver(false);
        }
        let nextTurnId = getNextTurnType(gameInfoObj.turnType, gameInfoObj.gameNumber, gameInfoObj.lastStartingTurn, currentTurnId);
        updateCurrentTurnId(nextTurnId);
        setCurrentTurnId(nextTurnId);
        setIsGameOver(false);
    }

    let runPostGameAnalysis = () => {
        updateScores(currentTurnId);

        if (players[currentTurnId - 1].score >= Math.ceil(gameInfoObj.numOfGames / 2)) {
            setIsTournamentOver(true);
        }
    }

    return (
        <Card id="bg-card">
            {/* <Grid stackable columns={3} className="game-container-grid">
                <Grid.Column width={2}> */}
                    <Card id="game-container">
                        <div class="item-boundary">
                            {gameArray.map((colsArray, rowIndex) => {
                                return (
                                    colsArray.map((col, colIndex) => {
                                        return (
                                            <Item
                                                key={rowIndex + ',' + colIndex + ',' + col}
                                                value={col}
                                                col={colIndex}
                                                row={rowIndex}
                                                onItemClicked={handleItemClick}
                                            />
                                        )
                                    })
                                )
                            })}
                        </div>
                        <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="round">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                                </filter>
                            </defs>
                        </svg>
                    </Card>
                {/* </Grid.Column>
                <Grid.Column width={1}> */}
                    <GameInfo
                        isGameOver={isGameOver}
                        isTournamentOver={isTournamentOver}
                        players={players}
                        gameInfoObj={gameInfoObj}
                        currentTurnId={currentTurnId}
                        handleUndo={handleUndo}
                        handleNextGameClick={handleNextGameClick}
                    />
                {/* </Grid.Column> */}
            {/* </Grid> */}
        </Card>
    );
}

const mapStateToProps = (state) => {
    let playerInfoObj = getPlayerInfo(state);
    let gameInfoObj = getGameInfo(state);
    return {
        ...playerInfoObj,
        gameInfoObj
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateScores: (winnerId) => { dispatch(updateScoresAction(winnerId)) },
        resetScores: () => { dispatch(resetScoresAction()) },
        updateCurrentTurnId: (turnId) => { dispatch(updateTurnIdAction(turnId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);