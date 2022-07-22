import { randomInt } from "crypto";

export function Roll(die: number, adv: string): number {

    var r1 = randomInt(1, die);
    var r2 = randomInt(1, die);
    var higher: number;
    var lower: number;
    if (r1 > r2) {
        higher = r1;
        lower = r2;
    } else {
        higher = r2;
        lower = r1;
    }

    if (adv === 'adv') {
        return higher
    } else if (adv === 'dis') {
        return lower
    } else {
        return r1
    }
}