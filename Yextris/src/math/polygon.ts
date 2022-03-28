import { clone, cloneDeep, forEach, memoize, range, slice } from "lodash";
import { rotateConveyors } from "../game-logic/conveyor";
import { pickByWindow, rotateR } from "../utils/array";
import { assert } from "../utils/utils";
import { deltaAngle, initAngle } from "./angular";
import { Polar } from "./polar";
import { Rotate } from "./rotate";
import { Vector2 } from "./vector2";

// positive for clockWise, initAngle-90 center (0 ,0)
// 
// const halfPI = PI / 2
// export const regularPolygon2Of = memoize(_regularPolygon2Of);
// size == inner circle radius
export function regularPolygon2Of(sides: number,size:number=1): Vector2[] {
    assert(sides >= 3)
    const { v: iRad } = Rotate.deg2rad({ v: initAngle(sides), 'unit': 'deg' });
    const { v: dRad } = Rotate.deg2rad({ v: deltaAngle(sides), 'unit': 'deg' });
    return range(0, sides).map(i => Polar.toVector2({ radius: size/Math.cos(dRad/2), theta: iRad + (i * dRad) }))
}

// mem bug
// export const polyVert2SVGPath= memoize(_polyVert2SVGPath);
export function polyVert2SVGPath(vec2s:Vector2[]):string{
    assert(vec2s.length>= 3)
    const first = vec2s.shift();
    return `M ${first?.x??0} ${first?.y??0} ${vec2s.map(vec2=>`L ${vec2.x} ${vec2.y}`).join(' ')} z`
}
export function polygon2Points2Sides(points: Vector2[]): Vector2[] {
    let sides: Vector2[] = []
    let i = 0
    while (i + 2 <= points.length) {
        const start = points[i];
        const end = points[i + 1]
        const side = clone(start);
        Vector2.sub(side, end)
        sides.push(side)
        i += 1
    }
    return sides;
}
