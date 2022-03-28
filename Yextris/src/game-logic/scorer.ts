import { count } from "console";
import { compact, first, initial } from "lodash";
import { MainScene } from "./main-scene";


export interface Scorer {
    preCount:number;
    count: number;
    combo: number;
    scoringQueue: Array<Scoring>
}
interface Scoring {
    deltaCount: number
    restTimeToScore: number
}
export function initialScorer():Scorer {
    return {
        preCount:0, 
        count: 0,
        combo: 0,
        scoringQueue: []
    }
}
// candy should be marked with scored
export function score(scene: MainScene, dt: number) {
    const {scorer} = scene
    scorer.scoringQueue.forEach(scoring=>scoring.restTimeToScore -=dt)
   if(scorer.scoringQueue.some(scoring=>scoring.restTimeToScore<=0)){
    scorer.preCount = scorer.count;
   scorer.scoringQueue =  scorer.scoringQueue.filter(scoring=>{
       const isExpire = scoring.restTimeToScore<=0
        if(isExpire){
            scorer.count += scoring.deltaCount;
            return false
        }
        else{return true}
    })
   }

   scorer.scoringQueue = scorer.scoringQueue.concat(scoreEatingCandies(scene.eater.eatingCandies as any));

}
interface ScoredCandy extends Candy {
    scored:boolean
}
// export function updateScoringQueue(scorer:Scorer){}
export function scoreEatingCandies(eatingCandies: ScoredCandy[][]): Scoring[] {
    // TODO dup score same group how to mark??
    const scoring: Scoring[] = compact(eatingCandies.map(candiesGroup => {
        if(candiesGroup.some(candy=>candy.scored)){return undefined}
        const deltaCount = candiesGroup.length + Math.ceil(Math.pow(2, candiesGroup.length))
        const restTimeToScore = first(candiesGroup)?.restTimeToEat ?? 0
        // mark
        candiesGroup.forEach(candy=>candy.scored=true)

        // console.log(deltaCount,restTimeToScore)
        return { deltaCount, restTimeToScore }
    }))
    return scoring
}

// TODO
function combo() { }