/// <reference types="../types/types" />

import { clone, first, flatten, isEmpty, isNil, memoize } from "lodash";
import { Conveyor } from "../components/Conveyors";
import { Rotate } from "../math/rotate";
import { assertExist } from "../utils/utils";
import { emptyConveyors } from "./conveyor";
import { MainScene } from "./main-scene";

export interface Eater<C extends Candy = Candy> {
    rotate: Rotate
    conveyors: Conveyors<C>;
    y: number;
    eatingCandies: C[][]
    eatDuration: number
}

export function initialEater(sides: number, y: number) {
    const _e = clone(prototype);
    _e.conveyors = emptyConveyors(sides);
    _e.y = y
    _e.eatDuration=1000
    return _e
}
const prototype: Eater = {
    rotate: Rotate.zeroDeg,
    conveyors: [],
    y: 0,
    eatingCandies: [],
    eatDuration: 0
}

// eat affect other mechanism, level up, combo score, candy gen.....xxx
// eat type affect 

// update eatTime
// clear all expire eating candy
// update all
// predicate endY
// moving all moving
// check and mark eating
export function eatWith(isSameType: IsSameTypeCandy<any>) {
    return ({ eater, feeder: { y: fy } }: MainScene, dt: number) => {
        const { y: ey } = eater;
        digest(eater,dt)

        const move = candiesMover(conflictChecker(fy, ey), fy < ey ? 1 : -1)
        move(eater, dt);

        gulp(eater, isSameType);

    }
}
function gulp(eater: Eater, isSameType: IsSameTypeCandy<any>) {
    const { eatDuration } = eater
    // TODO parameterize the num of link
    const toEatCandies = adjacentSameTypeCandies(settledCandies(eater.conveyors), isSameType).filter(chain => chain.length >= 3);
    toEatCandies.forEach(group => group.forEach(candy => {
        candy.restTimeToEat = eatDuration;
        candy.state = 'eating';
    }));

    eater.eatingCandies = eater.eatingCandies.concat(toEatCandies);
}
function digest(eater: Eater,dt:number) {
    eater.conveyors.forEach(conveyor=>conveyor.forEach(sCandy=>{if(sCandy.state==='eating'){sCandy.restTimeToEat-=dt} }))
    // suppose each group of eating candy have same expire time
    //TODO clear expire eating candy 
    eater.conveyors = eater.conveyors.map(conveyor => conveyor.filter(candy =>
        !(candy.state === 'eating' && candy.restTimeToEat <= 0)))
// then set all rest settled as moving
    settledCandies(eater.conveyors).forEach(conveyor=>conveyor.forEach(sCandy=>sCandy.state='moving' ))
    
    eater.eatingCandies = eater.eatingCandies.filter(group => (first(group)?.restTimeToEat ?? 0) > 0)
}

//TODO will general conflict detection make it easier???
function candiesMover(conflict: ConflictChecker, sign: number,) {
    return ({ conveyors, y }: Eater, dt: number) => {
        // for each lane check from down to up
        // move then check conflict
        conveyors.forEach(conveyor => conveyor.reduce(
            ({ bound, pre }, candy) => {
                const { height, speed, y } = candy;
                if (candy.state === 'moving') {
                    const next = y + sign * dt * abs(speed)
                    if (conflict(candy, bound)) {
                        candy.y = bound + sign * (height / 2);

                        if (!pre || pre.state !== 'moving') { candy.state = 'settled' }

                        return { bound: bound - sign * height, pre: candy }
                    }
                    else {
                        candy.y = next
                        return { bound: candy.y - sign * (height / 2) , pre: candy }
                    }
                }
                else if (candy.state === 'settled' || candy.state === 'eating') {
                    // what if a moving candy touch an eating candy with same color?
                    return { bound: bound - sign * height, pre: candy }
                }
                else { throw 'never' }
            }, { bound: y, pre: undefined } as { bound: number, pre: Candy | undefined }))
    }
}

const { abs } = Math
// type Mover = ({ y, speed }: Candy, dt: number) => number
// function mover(fy: number, ey: number) {
//     return ey > fy ?
//         ({ y, speed }: Candy, dt: number) => y + dt * abs(speed) :
//         ({ y, speed }: Candy, dt: number) => y - dt * abs(speed)
// }
type ConflictChecker = ({ y, height }: Candy, bound: number) => boolean
function conflictChecker(fy: number, ey: number): ConflictChecker {
    return ey > fy ?
        ({ y, height }: Candy, bound: number) => y + (height / 2) >= bound :
        ({ y, height }: Candy, bound: number) => y - (height / 2) <= bound

}

function settledCandies(conveyors: Conveyors): Conveyors {
    return conveyors.map(conveyor => conveyor.filter(candy => candy.state === 'settled'))
}

type SearchingCandy = { candy: Candy, conveyorId: number, layer: number, marked: boolean };
function adjacentSameTypeCandies(
    conveyors: Conveyors, isSameType: IsSameTypeCandy<any>): Candy[][] {
    const group: Candy[][] = [];
    const map: SearchingCandy[][] = conveyors.map((conveyor, conveyorId) => conveyor.map((candy, layer) => ({ candy, conveyorId, layer, marked: false })))
    let rest = flatten(map);
    const getAdjacentCandies = adjacentSameTypeCandyGetter(map, isSameType);
    while (!isEmpty(rest)) {
        let _first = first(rest);
        if (existSearchingCandy(_first)) {
            let searching = [_first];
            // BFS
            while (!isEmpty(searching)) {
                let head = searching.shift()
                if (existSearchingCandy(head)) {
                    head.marked = true
                    getAdjacentCandies(head).forEach(candy => searching.push(candy));
                    if (searching.includes(undefined as any)) { console.log(searching, rest, getAdjacentCandies(head)) }
                    searching = searching.filter(candy => !candy.marked);
                }
            }

            group.push(rest.filter(c => c.marked).map(c => c.candy));

            rest = rest.filter(scandy => !scandy.marked)
        }
        else { throw ''/* never */ }
    }

    return group;
}

// TODO if height is not uniform left/right adjacent Candies could be more than one
function adjacentSameTypeCandyGetter(
    map: RecordType.DeepReadonly<SearchingCandy[][]>, isSameType: IsSameTypeCandy<any>) {
    const [u, b, l, r] = [up(), bottom(), left(map.length), right(map.length)];
    // return (candy: SearchingCandy) => {
    // const uCandy = (candy: SearchingCandy) => map[candy.conveyorId][u(candy.height)]
    // const bCandy = (candy: SearchingCandy) => map[candy.conveyorId][b(candy.height)]
    // const lCandy = (candy: SearchingCandy) => map[l(candy.conveyorId)][candy.height]
    // const rCandy = (candy: SearchingCandy) => map[r(candy.conveyorId)][candy.height]
    // return [uCandy, bCandy, lCandy, rCandy].map(adjCandy => adjCandy(candy)).filter(found=>!isEmpty(found))
    // }
    return ({ conveyorId, layer, candy }: SearchingCandy) => {
        const found: SearchingCandy[] = [];
        const uc = map[conveyorId][u(layer)]
        const bc = map[conveyorId][b(layer)]
        const lc = map[l(conveyorId)][layer]
        const rc = map[r(conveyorId)][layer]

        !isNil(uc) && isSameType(candy, uc.candy) ? found.push(uc) : void 0;
        !isNil(bc) && isSameType(candy, bc.candy) ? found.push(bc) : void 0;
        !isNil(lc) && isSameType(candy, lc.candy) ? found.push(lc) : void 0;
        !isNil(rc) && isSameType(candy, rc.candy) ? found.push(rc) : void 0;
        //         if(found.includes(undefined as any)){
        // console.log("======adjacentSG")
        //             console.log(found,uc,bc,lc,rc);
        //              console.log(
        // `uc && isSameType(candy, uc.candy) ,${uc && isSameType(candy, uc.candy)}`,
        // `bc && isSameType(candy, bc.candy) ,${bc && isSameType(candy, bc.candy)}`,
        // `lc && isSameType(candy, lc.candy) ,${lc && isSameType(candy, lc.candy)}`,
        // `rc && isSameType(candy, rc.candy) ,${rc && isSameType(candy, rc.candy)}`,

        //              )
        //              console.log("======adjacentSG")}
        return found
    }
}

function up() { return memoize((height: number) => height + 1) }
function bottom() { return memoize((height: number) => height - 1) }
function left(conveyorsNum: number) { return memoize((conveyorIndex: number): number => ((conveyorIndex - 1) + conveyorsNum) % conveyorsNum) }
function right(conveyorsNum: number) { return memoize((conveyorIndex: number) => (conveyorIndex + 1) % conveyorsNum); }

const existSearchingCandy = assertExist<SearchingCandy>("wrong conveyors when rotate")