import { MainScene as IMainScene } from "../game-logic/main-scene"
import { Eater } from "./Eater"
import { Feeder } from "./Feeder"

export function Pad({ fxId, viewBox,feeder,eater  }: {
    fxId:string
    viewBox:BoxSize
    
}& Pick<IMainScene,'feeder'|'eater'>) {
    return (
    <g 
    transform={`translate(${viewBox.width/2} ${viewBox.height/2})`}
    style={{willChange:'contents'}}
    >
        <Eater {...eater as any}/>
        <Feeder {...feeder as any}/>
        </g>
    )

}