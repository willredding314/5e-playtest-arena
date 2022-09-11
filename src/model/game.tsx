import { BattleData, PreMoveData } from "../components/arena";
import { CharBuild, Modifier } from "./char";
import { Roll } from "./roll";

export interface GameSettings {
    characterSet: [number, CharBuild][];
    numPlayers: number;
    numEnemies: number;
    enemyType: string;
    battlefield: string;
}

export interface Skill {
    name: string;
    ability: string;
}

export function ExecuteTurn(moveData: PreMoveData, data: BattleData): BattleData {

    switch(moveData.determinedMove[1]) {
        case 'pass':
            return data
        case 'move':
            return ExecuteMove(moveData, data)
    }

    return data
}

function ExecuteMove(moveData: PreMoveData, data: BattleData): BattleData {

    
    return data
}

export function CharsOnTurn(orderChars: [number, CharBuild][], init: number): CharBuild[]{

    var returnChars: CharBuild[] = []
    orderChars.forEach((value: [number, CharBuild]) => {
        if (value[0] == init) {
            returnChars.push(value[1])
        }
    })

    return returnChars 
}

export function RollInitiativeGroup(chars: [number, CharBuild][]): [[number, CharBuild][], string[]] {

    var initOrder: [number, CharBuild][] = []

    for (let i = 0; i < chars.length; i++) {
        var init = RollInitiative(chars[i][1])
        var placeholder = {}
        var newChar = Object.assign(placeholder, chars[i][1])
        initOrder.push([init[0], newChar])
    }

    return [initOrder, []]
}

export function RollInitiative(char: CharBuild): [number, string[]] {

    var initiative: Skill = {
        name: 'initiative',
        ability: 'dex'
    }

    var reTags: string[] = []

    var res = SkillCheck(char, initiative, reTags)
    return res
}

export function SkillCheck(char: CharBuild, skill: Skill, tags: string[]): [number, string[]] {

    var reTags: string[] = []
    reTags.push(char.id, 'skill', skill.ability, skill.name)

    var condFail = ConditionAutoFail(char, skill)
    var baseMod = GetModifier(char, skill.ability)
    var profBonus = SkillBonus(char, skill.name)
    var naturalAdv = AdvModifier(char, skill, tags)
    var additionalMods = AdditionalSkillModifier(char, skill, tags)

    if (condFail) {
        tags.push('fail')
        return [-20, reTags]
    }

    var totalMod = baseMod + profBonus + additionalMods;
    var totalAdv = ''

    if (naturalAdv != 'null') {
        var tagAdv = tags.includes('adv')
        var tagDis = tags.includes('dis') 
        if (tagAdv && tagDis) {
            totalAdv = naturalAdv
        } else if (tagAdv) {
            if (naturalAdv === 'dis') {
                totalAdv = ''
            } else {
                totalAdv = 'adv'
            }
        } else if (tagDis) {
            if (naturalAdv === 'adv') {
                totalAdv = ''
            } else {
                totalAdv = 'dis'
            }
        } else {
            totalAdv = naturalAdv
        }
    }

    if (totalAdv === 'dis' || totalAdv === 'adv') {
        reTags.push(totalAdv)
    }

    var rollNum = Roll(20, totalAdv) + totalMod
    reTags.push(rollNum.toString())
    rollNum = MinimumRollSkill(char, skill, tags, rollNum)

    return [rollNum, reTags]
}

export function MinimumRollSkill(char: CharBuild, skill: Skill, tags: string[], rollNum: number): number {

    //check for minimum skill roll

    return rollNum
}

export function ConditionAutoFail(char: CharBuild, skill: Skill): boolean {

    for (let i = 0; i < char.conditions.length; i++) {
        //check each condition for auto fail
    }

    return false
}

export function AdditionalSkillModifier(char: CharBuild, skill: Skill, tags: string[]): number {

    var mod = 0

    for (let i = 0; i < char.mods.length; i++) {
        var currMod = char.mods[i]
        var tempTags = tags
        tempTags.push(skill.ability, skill.name);
        if (RelevantMods(currMod, tempTags)) {
            mod = mod + currMod.diff
            if (currMod.diffProf) {
                mod = mod + char.profb
            }
        }
    }

    return mod
}

export function AdvModifier(char: CharBuild, skill: Skill, tags: string[]): string {

    var advs = 0;
    var diss = 0;

    for (let i = 0; i < char.mods.length; i++) {
        var currMod = char.mods[i]
        var tempTags = tags
        tempTags.push(skill.ability, skill.name);
        if (RelevantMods(currMod, tempTags)) {
            if (currMod.adv === true) {
                advs++
            } else if (currMod.dis === true) {
                diss++
            }
        }
    }

    for (let i = 0; i < char.conditions.length; i++) {
        //check each condition for adv/dis
    }
    
    if ((advs > 0 && diss > 0)) {
        return 'null'
    } else if (diss > 0) {
        return 'dis'
    } else if (advs > 0) {
        return 'adv'
    } else {
        return ''
    }
}

export function RelevantMods(mod: Modifier, tags: string[]): boolean {

    for (let i = 0; i < mod.requirements.length; i++) {
        if (!tags.includes(mod.requirements[i])) {
            return false
        }
    }
    return true    
}

export function SkillBonus(char: CharBuild, skill: string): number {

    if (char.exp.indexOf(skill) > -1) {
        return char.exp.indexOf(skill)
    } else if (char.prof.indexOf(skill) > -1) {
        return char.prof.indexOf(skill)
    } else {
        return 0
    }
}

export function GetModifier(char: CharBuild, stat: string): number {

    if (stat === 'str') {
        return Math.floor((char.str - 10) / 2) 
    } else if (stat === 'dex') {
        return Math.floor((char.dex - 10) / 2) 
    } else if (stat === 'con') {
        return Math.floor((char.con - 10) / 2) 
    } else if (stat === 'int') {
        return Math.floor((char.int - 10) / 2) 
    } else if (stat === 'wis') {
        return Math.floor((char.wis - 10) / 2) 
    } else if (stat === 'cha') {
        return Math.floor((char.wis - 10) / 2) 
    }
    return 0
}