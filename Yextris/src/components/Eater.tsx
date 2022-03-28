import { ColorCandy as IColorCandy } from "../game-logic/candy-factory"
import { Eater as IEater } from "../game-logic/eater";
import { deltaAngle } from "../math/angular";
import { RGB } from "../math/color";
import { polyVert2SVGPath, regularPolygon2Of } from "../math/polygon";
import { Conveyors } from "./Conveyors";
export function Eater(props: IEater<IColorCandy>) {
    const path = polyVert2SVGPath(regularPolygon2Of(props.conveyors.length, .7 * props.y))
    return (
        <g
            style={{
                // transition: `all .9s`,
                zIndex: 1,
                rotate: `${props.rotate.v}deg`,
            }}>
            <path
                // style={{willChange:`contents` }}
                // transform={`rotate(${deltaAngle(props.conveyors.length) / 2})`}
                d={path}
                stroke={`#260144`}
                strokeWidth={.18 * props.y} fill="none" >
                {/* <animate type="CSS"></animate>  */}
            </path>
            <Conveyors {...props} />
        </g >)

}