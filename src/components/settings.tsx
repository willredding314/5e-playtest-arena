import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { Col, Container, Row } from "react-bootstrap"
import './styles.css'
import { useState } from 'react'
import ReactiveButton from 'reactive-button'
import { GameSettings } from "../model/game";

interface SettingsProps {
    settings: GameSettings
    onStartClick: any
}

const Settings: React.FC<SettingsProps> = (props) => {

    const particlesInit = async (engine: any) => {
        await loadFull(engine);
    };

    const [startState, setStartState] = useState('idle')

    const onStartHandler = () => {
        setStartState('loading');
        setTimeout(() => {
            setStartState('success');
            props.onStartClick();
        }, 2000)
    }

    return (
        <section>
            <Container fluid className="settings-container">
                <Particles id="#tsparticles"
                    init={particlesInit}
                    options={{
                        background: {
                            color: {
                                value: "#4ABDAC",
                            },
                        },
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: false,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: false,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                                bubble: {
                                    distance: 400,
                                    duration: 2,
                                    opacity: 0.5,
                                    size: 40
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#ffffff",
                            },
                            collisions: {
                                enable: true,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 1,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 100,
                            },
                            opacity: {
                                value: 0.1,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: { min: 1, max: 5 },
                            },
                        }
                    }}
                />
                <Container className="settings-section">
                    <Row>
                        <Col md="12">
                            <h1 className="white-s settings-title">5e Playtest Arena</h1>
                            <h1 className="white-s center">Testing D&D characters with 5e rules</h1>
                            <h4 className="white-s center">By Will Redding</h4>
                        </Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <div className="start-button-div">
                        <ReactiveButton
                            buttonState={startState}
                            onClick={onStartHandler}
                            idleText={'Play!'}
                            loadingText={'Here We Go!'}
                            type={'button'}
                            className={'start-button'}
                            style={{
                                'borderRadius': '5px',
                                'color': "white",
                            }}
                            width="200px"
                            height="80px"
                        />
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h4 className="white-s center">
                        Currently, this is in development. During development,
                        the character creation feature is unavailable, and all playtesting 
                        will take place on a pre-set level 1 fighter. 
                    </h4>
                </Container>
            </Container>
        </section>
    )
}

export default Settings

