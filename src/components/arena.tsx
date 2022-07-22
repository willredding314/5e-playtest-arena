import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import { Board, Cell, sampleBoard, sampleBoardItems } from "../model/board"
import { GameSettings } from "../model/game"
import GameBoard from "./gameboard"
import './styles.css'

interface ArenaProps {
    settings: GameSettings
}

const Arena: React.FC<ArenaProps> = (props) => {

    const particlesInit = async (engine: any) => {
        await loadFull(engine);
    };

    const [boardState, setBoardState] = useState([]);
    const [initState, setInitState] = useState(58);

    var board = sampleBoard;
    board = sampleBoardItems(board);

    return (
        <section>
            <Container fluid className="arena-screen">
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
                <Container className="arena-section">
                    <Row>
                        <Col md="6">
                            <h1 className="white-c">LEFT</h1>
                        </Col>
                        <Col md="6">
                            <div className='board'>
                                <GameBoard board={board} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </section>
    )
}

export default Arena
