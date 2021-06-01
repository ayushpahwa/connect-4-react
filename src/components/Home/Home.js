import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Grid, Modal } from 'semantic-ui-react'

import './Home.css'

export const Home = () => {
    let [isModalOpen, toggleModal] = useState(false);
    let history = useHistory();

    return (
        <Card className="home-container">
            <p className="home-title">Connect 4!</p>
            <p className="home-subtitle">Play with other players around the world!</p>

            <Grid stackable columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Button
                            className="home-action-buttons"
                            icon='user'
                            labelPosition='left'
                            content='Custom game'
                            style={{ backgroundColor: '#4BABFF' }}
                            onClick={() => toggleModal(!isModalOpen)} />
                    </Grid.Column>
                    <Grid.Column>
                        <Button
                            className="home-action-buttons"
                            icon='users'
                            labelPosition='left'
                            content='Two Players'
                            style={{ backgroundColor: '#4B7BFF' }}
                            onClick={() => { history.push('/setup') }}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column>
                        <Button
                            className="home-action-buttons"
                            icon='globe'
                            labelPosition='left'
                            content='Game online'
                            style={{ backgroundColor: '#4B4BFF' }}
                            onClick={() => toggleModal(!isModalOpen)} />
                    </Grid.Column>
                    <Grid.Column>
                        <Button
                            className="home-action-buttons"
                            icon='book'
                            labelPosition='left'
                            content='Training game'
                            style={{ backgroundColor: '#6E4BFF' }}
                            onClick={() => toggleModal(!isModalOpen)} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Modal size='mini' open={isModalOpen} onClose={() => toggleModal(!isModalOpen)} >
                <Modal.Content>
                    <p>Coming soon...</p>
                </Modal.Content>
            </Modal>

        </Card >
    );
}