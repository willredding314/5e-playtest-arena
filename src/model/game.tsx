import { CharBuild, Modifier } from "./char";
import { Roll } from "./roll";

export interface GameSettings {
    characterSet: Map<number, CharBuild>;
    numPlayers: number;
    numEnemies: number;
    enemyType: string;
    battlefield: string;
}

export interface Skill {
    name: string;
    ability: string;
}

export function RollInitiativeGroup(chars: Map<number, CharBuild>): Map<number, CharBuild> {

    var initOrder = new Map<number, CharBuild>()

    chars.forEach((value: CharBuild) => {
        var init = RollInitiative(value);
        initOrder.set(init, value);
    })

    return initOrder
}

export function RollInitiative(char: CharBuild): number {


    return 0
}

export function SkillCheck(char: CharBuild, skill: Skill, tags: string[]): number {

    var condFail = ConditionAutoFail(char, skill);
    var baseMod = Modifier(char, skill.ability);
    var profBonus = SkillBonus(char, skill.name);
    var naturalAdv = AdvModifier(char, skill, tags);
    var additionalMods = AdditionalSkillModifier(char, skill, tags);

    if (condFail) {
        return -20
    }

    var totalMod = baseMod + profBonus + additionalMods;
    var totalAdv = ''
    var total = 0

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

    var rollNum = Roll(20, totalAdv)
    rollNum = MinimumRollSkill(char, skill, tags, rollNum)

    return rollNum
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
        var currMod = char.mods[i];
        var tempTags = tags; 
        tempTags.push(skill.ability, skill.name);
        if (RelevantMods(currMod, tempTags)) {
            mod = mod + currMod.diff;
            if (currMod.diffProf) {
                mod = mod + char.profb;
            }
        }
    }

    return mod
}

export function AdvModifier(char: CharBuild, skill: Skill, tags: string[]): string {

    var advs = 0;
    var diss = 0;

    for (let i = 0; i < char.mods.length; i++) {
        var currMod = char.mods[i];
        var tempTags = tags; 
        tempTags.push(skill.ability, skill.name);
        if (RelevantMods(currMod, tempTags)) {
            if (currMod.adv === true) {
                advs++;
            } else if (currMod.dis === true) {
                diss++;
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

export function Modifier(char: CharBuild, stat: string): number {

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