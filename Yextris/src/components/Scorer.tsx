import { Scorer as IScorer } from "../game-logic/scorer";
import CountUp from 'react-countup';
import { clamp } from "lodash";
import "./Scorer.css"

import { MainScene as IMainScene } from "../game-logic/main-scene";

export function Scorer({ viewBox, scorer, eater: { y: ey }, sides }: IMainScene) {
    const dur = (scorer.count - scorer.preCount) / scorer.scoringQueue.reduce((pre, cur) => cur.deltaCount + pre, 0)

    const ratio = clamp(dur, 0.7, 1)
    return <CountUp
        start={scorer.preCount}
        end={scorer.count}
        duration={1.75}

        >
        {({ countUpRef }) => {
            return <g id='scorer' 
             style={{
                        willChange:`transformation`,
             }}
             transform={`translate(${viewBox.width / 2} ${15*viewBox.height/100})`} >
                <text 
                dominantBaseline="middle" textAnchor="middle"
                stroke="white" strokeWidth={2} x={0} y={0} id={'scorer'} ref={countUpRef as any} // className="heartbeat" 
                    style={{
                        fontSize: `${.1*ey}em`,
                        willChange:`transform`,
                        transform:`scale(${2*ratio},${2*ratio})`,
                        transition:`transform ${dur}s easeInOutBounce`,
                    }}
                />

            </g >

        }}
    </CountUp>

}
