import { MainScene } from "./main-scene";

export function checkGameOver(scene:MainScene){
   if(!scene.eater.conveyors.every(conveyor=>conveyor.length<scene.maxLayer) ){
       scene.gameOver = true
   }
}