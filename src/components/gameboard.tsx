

interface RowProps {
    row: Cell[]
    ind: Number
}

interface FillProps {
    cell: Cell
}

interface BoardProps {
    board: Board
}

interface Board {
    width: number
    height: number 
    cells: Cell[]
}

interface Cell {
    block: string 
    character: string 
    difficult: boolean
    passable: boolean
}

function cellNum(board: Board, x: number, y: number): number {
    var newY = y;
    var rowStart = board.width * newY;
    var pos = rowStart + x;
    return pos
}

function orderCells(board: Board): Cell[][] {
    var newCells: Cell[][] = [];
    var pos = 0;

    for (let i = 0; i < board.height; i++) {
        newCells[i] = [];
        for (let j = 0; j < board.width; j++) {
            newCells[i][j] = board.cells[pos];
            pos++;
        }
    }

    return newCells
}

const GameBoard: React.FC<BoardProps> = (props) => {

    var orderedCells = orderCells(props.board);
    var topCells = [];
    for (let i = 0; i < props.board.width; i++) {
        topCells[i] = i;
    }

    return (
        <div>
            <table >
                <tbody>
                    <tr>
                        <td></td>
                        {topCells.map(num => <td>{num}</td>)}
                    </tr>
                    {orderedCells.map((row, index) => <ArenaRow row={row} ind={index} />)}
                </tbody>
            </table>
        </div>
    )
}

const ArenaRow: React.FC<RowProps> = (props) => {

    return (
        <tr>
            <td><h6>{'' + props.ind}</h6></td>
            {props.row.map(val => <td className="board-cell">{<CellFill cell={val} />}</td>)}
        </tr>
    )
}

const CellFill: React.FC<FillProps> = (props) => {

    var data = ""
    var cell = props.cell

    if (cell.character !== "") {
        data = cell.character
    } else if (cell.block !== "") {
        data = cell.block
    }

    return (
        <h6>{data}</h6>
    )
}

export default GameBoard