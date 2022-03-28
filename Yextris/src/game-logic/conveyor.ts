/// <reference types="../types" />

import { clone, isNil, uniqWith } from "lodash";
import { deltaAngle } from "../math/angular";
import { Rotate } from "../math/rotate";
import { rotateL, rotateR } from "../utils/array";
import { assert, assertExist } from "../utils/utils";


const {abs} = Math
export function rotateConveyors({ conveyors, rotate }: { conveyors: Conveyors; rotate: Rotate; }):Conveyors{
    assert(rotate.unit==='deg')
    const dA = deltaAngle(conveyors.length)
    const n = abs((rotate.v/dA)%conveyors.length);
    const direction = rotate.v>0?Rotate.Direction.clockWise :Rotate.Direction.antiClockWise
    return rotateConveyorsN(conveyors,direction,n)
}


function rotateConveyorsN(conveyors: Conveyors, direction: Rotate.Direction, n: number) {
    const newConveyors = clone(conveyors)
    while (n > 0) {
      rotateConveyorsOne(newConveyors, direction);
        n--;
    }
    return newConveyors;
}
export function rotateConveyorsOne(conveyors: Conveyors, direction: Rotate.Direction) {
    if (direction === Rotate.Direction.clockWise) {
        rotateR(conveyors)
    }
    else if ((direction === Rotate.Direction.antiClockWise)) {
        rotateL(conveyors)
    }
    else { throw 'never' } // never
}

export function emptyConveyors(length: number) {
    return  Array.from({ length }).map(v => []) as any;
}


// const existConveyor = assertExist<Candy[]>("wrong conveyors when rotate")