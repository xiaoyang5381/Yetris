import { deltaAngle, deltaRadOfSides } from "../math/angular";
import { Rotate } from "../math/rotate";
import { assert } from "../utils";
import { ColorCandy  } from "./ColorCandy";
import {ColorCandy as IColorCandy} from "../game-logic/candy-factory"

export function Conveyors( {conveyors,rotate}: {rotate:Rotate, conveyors: Conveyors<IColorCandy> }) {
    const dA = deltaAngle(conveyors.length)
    // const iA = initAngle(conveyors.length)
    return <g >
        {conveyors.map((conveyor,i)=>
        <Conveyor candies={conveyor} rotate={{ v:  dA * i, unit: 'deg' }} deltaRad={deltaRadOfSides(conveyors.length)}/>)}
        </g>
}

export function Conveyor({ rotate, candies,deltaRad }: { candies: IColorCandy[], rotate: Rotate , deltaRad: number }) {
    assert(rotate.unit ==='deg');
    return <g   
     transform={`rotate(${rotate.v })`}>{
        candies.map(candy=><ColorCandy {...candy} deltaRad={deltaRad} />)
         }</g>
}

