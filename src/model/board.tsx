
export interface Board {
    width: number
    height: number 
    cells: Cell[]
}

export interface Cell {
    block: string 
    character: string 
    difficult: boolean
    passable: boolean
}

export var emptyCell: Cell = {
    block: '',
    character: '',
    difficult: false,
    passable: true
}

export var cells72: Cell[] = [];
for (let i = 0; i < 96; i++) {
    cells72[i] = emptyCell
}

export var sampleBoard: Board = {
    width: 8,
    height: 12,
    cells: cells72
}

export function cellNum(board: Board, x: number, y: number): number {
    var newY = y;
    var rowStart = board.width * newY;
    var pos = rowStart + x;
    return pos
}

export function canPlace(board: Board, itemType: string, x: number, y: number): boolean {
    return true
}

export function boardPlace(board: Board, item: string, itemType: string, x: number, y: number): Board {

    var loc = cellNum(board, x, y);

    if (canPlace(board, itemType, x, y)) {
        var newCell: Cell = {
            block: board.cells[loc].block,
            character: board.cells[loc].character,
            difficult: board.cells[loc].difficult, 
            passable: board.cells[loc].passable
        }
        if (itemType === 'block') {
            newCell.block = item 
        }
        if (itemType === 'character') {
            newCell.character = item
        }

        board.cells[loc] = newCell
    }

    return board
}

export function sampleBoardItems(board: Board): Board {
    board = boardPlace(board, "player", "character", 3, 0);
    board = boardPlace(board, "enemy", "character", 4, 11);
    board = boardPlace(board, "stone", "block", 2, 7);
    board = boardPlace(board, "stone", "block", 5, 4);
    board = boardPlace(board, "stone", "block", 4, 9);
    board = boardPlace(board, "stone", "block", 1, 2);
    return board
}