
function randomInt(max: number) {
    return Math.floor(Math.random() * max + 1);
}

export function Roll(die: number, adv: string): number {

    var r1 = randomInt(die);
    var r2 = randomInt(die);
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
        console.log(higher)
        return higher
    } else if (adv === 'dis') {
        console.log(lower)
        return lower
    } else {
        console.log(r1)
        return r1
    }
}