import { TurnContext } from "./arena"
import { Action, CharBuild } from "../model/char"
import './styles.css'

interface ControlsProps {
    char: CharBuild
    ctx: TurnContext
    returnMove(tags: string[]): void
}

export const Controls: React.FC<ControlsProps> = (props) => {

    var containsMove = true 
    props.char.actions.forEach((action: Action) => {
        if(action.name == 'move') {
            containsMove = true
        }
    })


    return (
        <div className='controls-section'>
            <div className='move-buttons'>
                {containsMove && 
                <div>
                <button onClick={() => props.returnMove([props.char.id, 'move', 'up'])}>Up</button>
                <button onClick={() => props.returnMove([props.char.id, 'move', 'down'])}>Down</button>
                <button onClick={() => props.returnMove([props.char.id, 'move', 'left'])}>Left</button>
                <button onClick={() => props.returnMove([props.char.id, 'move', 'right'])}>Right</button>
                </div>
                }
            </div>
        </div>
    )
}