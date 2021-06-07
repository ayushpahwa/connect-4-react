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
    let fileHandle;
    let [player01Src,setPlayer01Src] = useState(IMAGE_DATA[0]);
    let [player02Src,setPlayer02Src] = useState(IMAGE_DATA[1]);
    async function fileOpen(playerID) {
        [fileHandle] = await window.showOpenFilePicker(
            {
                types: [
                    {
                        description: 'Images',
                        accept: {
                            'image/*': ['.png', '.gif', '.jpeg', '.jpg']
                        }
                    }
                ],
            }
        );
        const file = await fileHandle.getFile();
        if (file.type && !file.type.startsWith('image/')) {
            console.log('File is not an image.', file.type, file);
            return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            if (playerID === 1) {
                setPlayer01Src(event.target.result);
            } else{
                setPlayer02Src(event.target.result);
            }
        });
        reader.readAsDataURL(file);
    }

    // let img1 = import(IMAGE_DATA[0]);
    return (
        <>
            <Card className="Setup">
                <Card style={{ backgroundColor: P1_COLOR_BG }} className="user-card-container" >
                    <Card.Content className="user-card" >
                        <div style={{ borderColor: P1_COLOR }} className="img-container"
                            onClick={() => {
                                fileOpen(1);
                            }}>
                            <img src={player01Src} alt="Player 01" />
                        </div>
                        <div>
                            <Card.Meta onClick={() => { setModalSettings(MODAL_SETTINGS_NAME_INPUT_1) }}>
                                <span >Player 01</span>
                            </Card.Meta>
                            <Card.Header>{modalData.namePlayer01}</Card.Header>
                        </div>
                    </Card.Content>
                </Card>
                <Card style={{ backgroundColor: P2_COLOR_BG }} className="user-card-container" >
                    <Card.Content className="user-card" >
                        <div style={{ borderColor: P2_COLOR }} className="img-container" onClick={() => { fileOpen(2); }}>
                            <img src={player02Src} alt="Player 02" />
                        </div>
                        <div>
                            <Card.Meta onClick={() => { setModalSettings(MODAL_SETTINGS_NAME_INPUT_2) }} >
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
                <Divider style={{ margin: '10px', width: '100%' }} />
                <Button
                    content='Start Game'
                    primary
                    className="start-game"
                    onClick={() => {
                        onSubmitSettings(modalData)
                        history.push('/game')
                    }}
                />
            </Card >
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