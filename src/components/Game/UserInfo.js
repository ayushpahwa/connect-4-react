import { IMAGE_DATA, P1_COLOR, P2_COLOR } from "../../constants";

export const UserInfo = ({ info, index, currentTurnId }) => {

    let borderColorOuter = '';
    if (index === currentTurnId) {
        borderColorOuter = 'orange';
    }

    let borderColor = P1_COLOR;
    if (index === 2) {
        borderColor = P2_COLOR;
    }


    return (
        <div className="player-card">
            <div className="info-icon-container" style={{ borderColor:borderColorOuter }}>
                <div style={{ borderColor }} className="img-container">
                    <img src={IMAGE_DATA[index-1]} alt={"Player " + index} />
                </div>
            </div>
            <div className="score-container">
                <div>
                    <label>Player {index}</label>
                    <label style={{ float: "right" }} >Score</label>
                </div>
                <div>
                    <p>{info.name}</p>
                    <p style={{ float: "right" }} >{info.score}</p>
                </div>
            </div>
        </div>
    )
}