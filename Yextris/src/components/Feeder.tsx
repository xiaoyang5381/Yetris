import { Feeder as IFeeder } from "../game-logic/feeder";
import { ColorCandy as IColorCandy } from "../game-logic/candy-factory"
import { Conveyors } from "./Conveyors";
import { polyVert2SVGPath, regularPolygon2Of } from "../math/polygon";
import { deltaAngle, initAngle } from "../math/angular";
import { RGB } from "../math/color";
import { useEffect } from "react";

// const memRandRGB = memRandom(10000,()=>RGB.toCSS(RGB.random()))
export function Feeder(props: IFeeder<IColorCandy>) {
    const sides = props.conveyors.length
    const path = polyVert2SVGPath(regularPolygon2Of(sides, props.y))
    return (
    <g 
    style={{ 
        willChange:`transform`,
        transition: `all .4s`, transform:`rotate(${props.rotate.v}deg)`
    }}
        >
        <path  
        d={path}
            stroke = {`#534d4d`}
            strokeWidth={3} fill="none" >
                </path>
        <Conveyors {...props} />
    </g >)

}
// function memRandom(times:number,rand:()=>any){
//     let pre:any
//     let n:number = 0;
//     return ()=>{
//         if(n<=0){pre = rand();n=times}
//         n--;
//         return pre;
//     }
// }
