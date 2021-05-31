import { getCurrentConfig } from '../../redux/selectors';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Divider, Button } from 'semantic-ui-react';
import './Setup.css';
import { SetupModal } from './setupModal';
import { setConfig } from '../../redux/actions'
import {
    MODAL_SETTINGS_DEFAULT, MODAL_SETTINGS_NAME_INPUT_1, MODAL_SETTINGS_NAME_INPUT_2,
    MODAL_SETTINGS_GAMES_INPUT, MODAL_SETTINGS_TURN_INPUT, allTurnTypesList, P1_COLOR_BG, P2_COLOR_BG,
    IMAGE_DATA, P1_COLOR, P2_COLOR
} from '../../constants'

const Setup = ({ config, onSubmitSettings }) => {

    let [modalData, setModalData] = useState(config);
    let [modalSettings, setModalSettings] = useState(MODAL_SETTINGS_DEFAULT);
    let history = useHistory();
    return (
        <>
            <Card className="Setup">
                <Card style={{ backgroundColor: P1_COLOR_BG }} className="user-card-container" onClick={() => { setModalSettings(MODAL_SETTINGS_NAME_INPUT_1) }} >
                    <Card.Content className="user-card" >
                        <div style={{ borderColor: P1_COLOR }} className="img-container">
                            <img src={IMAGE_DATA[0]} alt="Player 01" />
                        </div>
                        <div>
                            <Card.Meta>
                                <span >Player 01</span>
                            </Card.Meta>
                            <Card.Header>{modalData.namePlayer01}</Card.Header>
                        </div>
                    </Card.Content>
                </Card>
                <Card style={{ backgroundColor: P2_COLOR_BG }} className="user-card-container" onClick={() => { setModalSettings(MODAL_SETTINGS_NAME_INPUT_2) }} >
                    <Card.Content className="user-card" >
                        <div style={{ borderColor: P2_COLOR }}  className="img-container">
                            <img src={IMAGE_DATA[1]} alt="Player 02" />
                        </div>
                        <div>
                            <Card.Meta>
                                <span >Player 02</span>
                            </Card.Meta>
                            <Card.Header>{modalData.namePlayer02}</Card.Header>
                        </div>
                    </Card.Content>
                </Card>
                <Card className="user-card-container" onClick={() => { setModalSettings(MODAL_SETTINGS_GAMES_INPUT) }} >
                    <Card.Content className="user-card" >
                        <div className="img-container">
                            <img src={IMAGE_DATA[3]} alt="Turn Type" />
                        </div>
                        <div>
                            <Card.Meta>
                                <span >Number of games</span>
                            </Card.Meta>
                            <Card.Header>{modalData.numOfGames} Games</Card.Header>
                        </div>
                    </Card.Content>
                </Card>
                <Card className="user-card-container" onClick={() => { setModalSettings(MODAL_SETTINGS_TURN_INPUT) }} >
                    <Card.Content className="user-card" >
                        <div className="img-container">
                            <img src={IMAGE_DATA[2]} alt="Number of Games" />
                        </div>
                        <div>
                            <Card.Meta>
                                <span >Who starts</span>
                            </Card.Meta>
                            <Card.Header>{allTurnTypesList[modalData.turnType]}</Card.Header>
                        </div>
                    </Card.Content>
                </Card>
                <Divider style={{ margin: '10px', width:'100%' }} />
                <Button
                    content='Start Game'
                    primary
                    className="start-game"
                    onClick={() => {
                        onSubmitSettings(modalData)
                        history.push('/game')
                    }}
                />
            </Card>
            <SetupModal
                modalSettings={modalSettings}
                onModalClosed={setModalSettings}
                modalData={modalData}
                setModalData={setModalData}
            />
        </>

    );
}

const mapStateToProps = state => {
    return {
        config: getCurrentConfig(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitSettings: (config) => { dispatch(setConfig(config)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup)