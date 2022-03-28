/// <reference types="../types/types" />
import { randomInt } from "crypto";
import { clone, isEmpty, last, memoize, random, range, shuffle, take } from "lodash";
import { RGB } from "../math/color";
import { randomItemOfArray } from "../utils/utils";
import type { MainScene } from "./main-scene";

const isSameColor: IsSameTypeCandy<ColorCandy> = (a: ColorCandy, b: ColorCandy) => RGB.equal(a.rgb, b.rgb);
const factories: CandyFactory[] = [
    {
        isSameType: isSameColor, produce: doIf((scene) => {
            const { feeder, eater } = scene
            // const rgbPalette = [RGB.red,RGB.green,RGB.blue]
            const rgbPalette = getUniformRGB(scene.sides);
            const randItemOf = randomItemOfArray(Math.random);
            const randColor = () => randItemOf(rgbPalette)
            const fy = feeder.y
            const ey = eater.y
            const restTimeToEat = eater.eatDuration;
            const height = uniformHeightOfLayers(scene.maxLayer)(fy, ey);

            const speed = createSpeed(scene)
            take(shuffle(range(0, scene.sides)), Math.floor(random(1, scene.sides / 2)))
            .forEach(i => {
                const candy: ColorCandy = {
                    ...colorCandyPrototype,
                    height,
                    rgb: randColor(),
                    speed,
                    restTimeToEat,
                    y: fy
                }
                feeder.conveyors[i].push(candy)
            })

            feeder.restTimeToFeed = feeder.feedDuration
        }, hasFed)
    }
]
function uniformHeightOfLayers(layers: number) {
    return (fy: number, ey: number) => Math.abs(fy - ey) / layers
}
// TODO
//speed/dt
function createSpeed(scene: MainScene): number {
    return .3;
}
const getUniformRGB = memoize((sides: number) => RGB.uniformDistributeHue(0, sides));
const colorCandyPrototype: ColorCandy = {
    rgb: RGB.black,
    state: "moving",
    height: 0,
    y: 0,
    speed: 0,
    restTimeToEat: 0
};
type ProduceCandy = (scene: MainScene) => void;
export function candyFactory(level: number): CandyFactory {
    // assert(!isEmpty(factories))
    // assert there at least one factory
    return factories[level] ?? last(factories)
}


type CandyFactory = { produce: ProduceCandy, isSameType: IsSameTypeCandy<any> }

function hasFed({ feeder: { conveyors } }: MainScene): boolean {
    return conveyors.every(c => isEmpty(c));
}
// function emptyCheck() {
//     return { then }
//     function then(produce: (scene:MainScene) => void) {
//         return (scene:MainScene) => {
//             if (scene.feeder.conveyors.every(c => isEmpty(c))) {
//                 produce(scene)
//             }
//         }
//     }
// }

export interface ColorCandy extends Candy {
    rgb: RGB
}

function doIf<F extends (...args: any) => any>(fn: F, predicate: (...args: Parameters<F>) => boolean): F {
    return ((...args: any) => predicate(...args) ? fn(...args) : void 0) as any
}

doIf((scene: MainScene) => { }, (scene: MainScene) => true)