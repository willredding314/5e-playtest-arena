import { useRef, useState } from "react"
import { Col, Container, FormText, Row } from "react-bootstrap"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import { Board, Cell, sampleBoard, sampleBoardItems } from "../model/board"
import { CharBuild, NoneChar } from "../model/char"
import { Controls } from "./controls"
import { CharsOnTurn, ExecuteTurn, GameSettings, RollInitiativeGroup } from "../model/game"
import GameBoard from "./gameboard"
import './styles.css'
import { Prints } from "./prints"
import { forEachTrailingCommentRange } from "typescript"

interface ArenaProps {
    settings: GameSettings
}

export interface BattleData {
    board: Board
    chars: [number, CharBuild][]
    currChar: CharBuild
    ctx: TurnContext
    prints: string[]
    started: boolean
}

export interface TurnContext {
    turn: boolean
    reaction: boolean 
    reactionTags: string[]
}

export interface PreMoveData {
    charID: string
    ctx: TurnContext
    predetermined: boolean 
    determinedMove: string[]
}

const normalTurn: TurnContext = {
    turn: true,
    reaction: false,
    reactionTags: []
}

function NewBattleData(boardN: Board, charsN: [number, CharBuild][], 
    currCharN: CharBuild, ctxN: TurnContext, printsN: string[], startedN: boolean): BattleData {
    var newData: BattleData = {
        board: boardN,
        chars: charsN,
        currChar: currCharN,
        ctx: ctxN,
        prints: printsN,
        started: startedN
    }
    return newData
}

function GetCharById(charID: string, chars: [number, CharBuild][]): CharBuild {

    for (let i = 0; i < charID.length; i++) {
        var curr = chars[i]
        if (curr[1].id == charID) {
            return curr[1]
        }
    }
    throw new Error("Broke on GetCharById, no char with given ID")
}

function GetNextCharId(currID: string, chars: [number, CharBuild][]): string {

    for (let i = chars.length - 1; i >= 1; i ++) {
        if (currID == chars[i][1].id) {
            return chars[i-1][1].id
        }
    }

    if (currID == chars[0][1].id) {
        return chars[chars.length - 1][1].id
    }

    throw new Error("Broke on GetCharById, no char with given ID")
}

const Arena: React.FC<ArenaProps> = (props) => {

    //Particles
    const particlesInit = async (engine: any) => {
        await loadFull(engine)
    };

    //Setup
    var startBoard = sampleBoard
    startBoard = sampleBoardItems(startBoard)
    var startData: BattleData = {
        board: startBoard,
        chars: props.settings.characterSet,
        currChar: NoneChar,
        ctx: normalTurn,
        prints: [],
        started: false
    }   
    var startMove: string[] = ['none', 'pass', 'checked']

    //State logic
    const [currMove, setCurrMove] = useState(startMove)
    var emptyPreMoveData: PreMoveData[] = []
    const moveStack = useRef(emptyPreMoveData)
    const data = useRef(startData)
    
    const returnMove = (tags: string[]) => {
        setCurrMove(tags)
        var concatTags = tags.join(" ")
        var dataCopy: BattleData = Object.assign({}, data.current)
        dataCopy.prints.push(concatTags)
        data.current = dataCopy
    }

    //////////////////////////////////////////////////////////////////
    //GAME
    //////////////////////////////////////////////////////////////////

    /////////////////////
    //init steps
    /////////////////////
    if (!data.current.started) {
        var initChars = RollInitiativeGroup(data.current.chars)[0]
        var orderChars = initChars.sort((first, second) => 0 - (first[0] < second[0] ? -1 : 1))
        console.log(initChars)
        var initData = NewBattleData(data.current.board, orderChars, orderChars[0][1], normalTurn, data.current.prints, true)
        data.current = initData
    }

    /////////////////////
    //receive move
    /////////////////////

    var currMoveData: PreMoveData = {
        charID: data.current.currChar.id,
        ctx: data.current.ctx,
        predetermined: true,
        determinedMove: currMove,
    }
    moveStack.current.push(currMoveData)


    /////////////////////
    //move interpretation
    /////////////////////

    var moveContinuation = false

    while (moveContinuation) {

        if (moveStack.current.length == 0) {
            var newMove: PreMoveData = {
                charID: GetNextCharId(data.current.currChar.id, data.current.chars),
                ctx: normalTurn,
                predetermined: false,
                determinedMove: []
            } 
        }
        
        var moveData = moveStack.current.pop()
        
        if (!moveData?.predetermined) {
            data.current.currChar = GetCharById(moveData!.charID, data.current.chars)
            data.current.ctx = moveData!.ctx!
            moveContinuation = false
            continue
        }

        //Move is determined
        var lastInd = moveData.determinedMove.length
        if (moveData.determinedMove[lastInd - 1] == 'unchecked') {
            moveData.determinedMove[lastInd - 1] = 'checked'
            moveStack.current.push(moveData)
            for (let i = data.current.chars.length - 1; i >= 0; i++) {
                var indChar = data.current.chars[i][1]
                if (indChar.id != data.current.currChar.id) {
                    var newCtx: TurnContext = {
                        turn: false,
                        reaction: true,
                        reactionTags: moveData.determinedMove
                    }
                    var newMove: PreMoveData = {
                        charID: indChar.id,
                        ctx: newCtx,
                        predetermined: false,
                        determinedMove: []
                    }
                    moveStack.current.push(newMove)
                }
            }
            continue
        }

        data.current = ExecuteTurn(moveData, data.current)

    }

    /////////////////////
    //set up next turn
    /////////////////////


    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    //PAGE CONSTRUCTION
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
                            <div className='controls'>
                                <Controls char={data.current.currChar} ctx={data.current.ctx} returnMove={returnMove} />
                            </div>
                            <div className='prints'>
                                <Prints data={data.current.prints} />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className='board'>
                                <GameBoard board={data.current.board} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </section>
    )
}

export default Arena

