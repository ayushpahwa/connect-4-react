import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Modal } from 'semantic-ui-react'

import './Home.css'

export const Home = () => {
    let [isModalOpen, toggleModal] = useState(false);
    let history = useHistory();

    return (
        <Card className="home-container">
            <p className="home-title">Connect 4!</p>
            <p className="home-subtitle">Play with other players around the world!</p>
            <section>
                <Button
                    className="home-action-buttons"
                    icon='user'
                    labelPosition='left'
                    content='Custom game'
                    style={{backgroundColor:'#4BABFF'}}
                    onClick={() => toggleModal(!isModalOpen)} />
                {/* <Link to='/setup' > */}
                    <Button
                        className="home-action-buttons"
                        icon='users'
                        labelPosition='left'
                        content='Two Players'
                        style={{backgroundColor:'#4B7BFF'}}
                        onClick={()=>{history.push('/setup')}}
                        />
            </section>
            <section>
                <Button
                    className="home-action-buttons"
                    icon='globe'
                    labelPosition='left'
                    content='Game online'
                    style={{backgroundColor:'#4B4BFF'}}
                    onClick={() => toggleModal(!isModalOpen)} />
                <Button
                    className="home-action-buttons"
                    icon='book'
                    labelPosition='left'
                    content='Training game'
                    style={{backgroundColor:'#6E4BFF'}}
                    onClick={() => toggleModal(!isModalOpen)} />
            </section>


            <Modal size='mini' open={isModalOpen} onClose={() => toggleModal(!isModalOpen)} >
                <Modal.Content>
                    <p>Coming soon...</p>
                </Modal.Content>
            </Modal>

        </Card>
    );
}