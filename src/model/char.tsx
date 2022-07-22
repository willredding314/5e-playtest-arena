
export interface Reaction {

}

export interface Action {
    name: string;
    type: string;
    outerTags: string[];
}

export interface Modifier {
    requirements: string[];
    adv: boolean;
    dis: boolean;
    diff: number;
    diffProf: boolean;
}

export interface ActionModifier {
    action: string;
    parameter: string;
    change: string;
    num: number;
}

export interface RollModifier {

}

export interface Mover {
    type: string;
}

export interface AutoMover extends Mover {

}

export interface CharBuild {
    mover: Mover;
    hp: number;
    ac: number;
    speed: number;
    profb: number;
    prof: string[];
    exp: string[];
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    mods: Modifier[];
    actions: Action[];
    reactions: Reaction[];
    conditions: string[];
}
