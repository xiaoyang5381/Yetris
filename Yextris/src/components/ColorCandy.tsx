import { ColorCandy as IColorCandy } from "../game-logic/candy-factory"
import { RGB } from "../math/color";
import "./ColorCandy.css"
const { tan } = Math;
export function ColorCandy({ y, deltaRad, height, rgb,state }: IColorCandy & { deltaRad: number }) {
    const x2 = y * tan(deltaRad / 2);
    const x1 = -x2
    return <g  
    className={`${state==='eating'?'vibrate':''}`}>
        <line 
        x1={x1+0.1*x2} x2={x2-0.1*x2} y1={y} y2={y}
            style={{
                strokeLinecap: "round",
                strokeWidth: .8*height,
                stroke: RGB.toCSS(rgb),
                willChange:'contents'
            }}
        />
     </g>
}
