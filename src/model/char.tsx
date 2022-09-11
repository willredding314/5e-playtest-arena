
export interface Reaction {

}

export interface Action {
    name: string
    type: string
    outerTags: string[]
}

export var moveAction: Action = {
    name: 'move',
    type: 'move',
    outerTags: ['move']
}

export interface Modifier {
    requirements: string[]
    adv: boolean
    dis: boolean
    diff: number
    diffProf: boolean
}

export interface ActionModifier {
    action: string
    parameter: string
    change: string
    num: number
}

export interface Limit {
    metric: string
    limit: number
}

export interface Mover {
    type: string
}

export interface Effect {
    moment: string 
    effectTags: string[]
}

export var manualMover: Mover = {
    type: 'manual'
}

export interface AutoMover extends Mover {

}

export interface CharBuild {
    id: string
    mover: Mover
    hp: number
    ac: number
    speed: number
    profb: number
    prof: string[]
    exp: string[]
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
    mods: Modifier[]
    actions: Action[]
    reactions: Reaction[]
    conditions: string[]
    effect: Effect[]
    limits: Limit[]
}

export var NoneChar: CharBuild = {
    id: 'noneChar',
    mover: manualMover,
    hp: 0,
    ac: 0,
    speed: 0,
    profb: 0,
    prof: [],
    exp: [],
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
    mods: [],
    actions: [],
    reactions: [],
    conditions: [],
    limits: [],
    effect: []
}

export var LuxumNewman: CharBuild = {
    id: 'LuxumNewman',
    mover: manualMover,
    hp: 12,
    ac: 16,
    speed: 30,
    profb: 2,
    prof: ['acrobatics', 'athletics', 'martial', 'simple'],
    exp: [],
    str: 18,
    dex: 16,
    con: 14,
    int: 13,
    wis: 11,
    cha: 9,
    mods: [],
    actions: [moveAction],
    reactions: [],
    conditions: [],
    limits: [],
    effect: []
}

export var LuxumNewman2: CharBuild = {
    id: 'LuxumNewman2',
    mover: manualMover,
    hp: 12,
    ac: 16,
    speed: 30,
    profb: 2,
    prof: ['acrobatics', 'athletics', 'martial', 'simple'],
    exp: [],
    str: 18,
    dex: 16,
    con: 14,
    int: 13,
    wis: 11,
    cha: 9,
    mods: [],
    actions: [moveAction],
    reactions: [],
    conditions: [],
    limits: [],
    effect: []
}