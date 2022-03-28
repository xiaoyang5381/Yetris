/// <reference types="../types/types" />
import { clone } from "lodash";
import { Rotate } from "../math/rotate";
import { emptyConveyors, rotateConveyors } from "./conveyor";
import type { MainScene } from "./main-scene";


export interface Feeder<C extends Candy = Candy> {
    rotate: Rotate
    conveyors: Conveyors<C>;
    y: number
    restTimeToFeed: number
    feedDuration: number
}

// TODO update time to feed
export function feed({ feeder, eater }: MainScene, dt: number) {
    const restTime = feeder.restTimeToFeed - dt;

    if (restTime <= 0) {
        const fcs = rotateConveyors(feeder)
        const ecs = rotateConveyors(eater)
        fcs.forEach((conveyor, i) => {
            conveyor.forEach(candy => { ecs[i].push(candy); })
        })
        // clear
        feeder.conveyors = emptyConveyors(feeder.conveyors.length);
        feeder.restTimeToFeed = 0
    }

    feeder.restTimeToFeed = restTime;
}

export function initialFeeder(sides: number, y: number) {
    const _f = clone(prototype);
    _f.conveyors = emptyConveyors(sides);
    _f.y = y
    return _f
}
const prototype: Feeder = {
    rotate: Rotate.zeroDeg,
    conveyors: [],
    y: 0,
    restTimeToFeed: 0,
    feedDuration:1000 
}