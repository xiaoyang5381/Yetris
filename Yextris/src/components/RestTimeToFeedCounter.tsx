import {MainScene} from "../game-logic/main-scene"
import { deltaAngle, deltaRadOfSides } from "../math/angular";
import { Rotate } from "../math/rotate";
export function RestTimeToFeedCounter(scene: MainScene) {
    // const r = .6 * (scene.eater.y)
    const dRad = deltaRadOfSides(scene.sides)
    const r = 1* (scene.feeder.y/Math.cos(dRad/2))
    const perimeter = Math.PI * 2 * r;
    const percent = scene.feeder.restTimeToFeed / scene.feeder.feedDuration;
    const cx = scene.viewBox.width / 2;
   const dA = -90 
   const      cy = scene.viewBox.height / 2;
    return <circle   cx={cx} cy={cy} r={r} 
            fill='none'
            // fill={'yellow'}
            style={{
                zIndex:1,
                willChange:'contents'
            } }
            strokeWidth={r * .02}
            transform={`rotate(${dA} ${cx} ${cy})`}
            stroke={`url(#gradient2)`}
            strokeDasharray={`${perimeter * percent} ${perimeter * (1 - percent)}`} />

}