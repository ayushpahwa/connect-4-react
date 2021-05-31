import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
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
        <div className="Game">
            <Card id="bg-card">
                <Card id="game-container">
                    {gameArray.map((colsArray, rowIndex) => {
                        return (
                            <div className='item-row' key={'row' + rowIndex} >
                                {colsArray.map((col, colIndex) => {
                                    return (
                                        <Item
                                            key={rowIndex + ',' + colIndex + ',' + col}
                                            value={col}
                                            col={colIndex}
                                            row={rowIndex}
                                            onItemClicked={handleItemClick}
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </Card>
                <GameInfo
                    isGameOver={isGameOver}
                    isTournamentOver={isTournamentOver}
                    players={players}
                    gameInfoObj={gameInfoObj}
                    currentTurnId={currentTurnId}
                    handleUndo={handleUndo}
                    handleNextGameClick={handleNextGameClick}
                />
            </Card>
        </div>
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