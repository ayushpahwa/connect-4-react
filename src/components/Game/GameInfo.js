import { useHistory } from "react-router";
import { Button, Card, Divider } from "semantic-ui-react"
import { UserInfo } from "./UserInfo"

export const GameInfo = ({ players, gameInfoObj, currentTurnId, handleUndo, handleNextGameClick, isGameOver, isTournamentOver }) => {
    let history = useHistory();
    let btnText = 'Next Game';
    let winningText = 'Playing Game: ' + (gameInfoObj.gameNumber + 1);
    let color = 'transparent';
    if (isGameOver) {
        color = '#FF6600';
        winningText = players[currentTurnId - 1].name + ", you won game " + gameInfoObj.gameNumber;
        if (isTournamentOver) {
            btnText = 'Play Again';
            winningText = players[currentTurnId - 1].name + ", you won the tournament!"
        }
    }
    return (
        <div id="info-container">
            <p className="info-title">{gameInfoObj.numOfGames} Game Tournament</p>
            <p className="info-title" style={{ color }}>Congratulations!</p>
            <p className="info-subtitle">{winningText}</p>

            <p className="info-subtitle"></p>
            <Card id="card-p1" >
                <UserInfo info={players[0]} index={1} currentTurnId={currentTurnId} />
            </Card>
            <Card id="card-p2">
                <UserInfo info={players[1]} index={2} currentTurnId={currentTurnId} />
            </Card>
            <Divider />
            {isGameOver ?
                <Button id="action-undo" content={btnText} onClick={handleNextGameClick} />
                :
                <Button id="action-undo" content="Undo" onClick={handleUndo} />
            }
            <Button id="action-end-tournament" content="End Tournament" onClick={() => history.goBack()} />
        </div>
    )
}