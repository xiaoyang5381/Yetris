import { deltaAngle } from "../math/angular";
import { Rotate } from "../math/rotate";
import { candyFactory, ColorCandy } from "./candy-factory";
import { checkGameOver } from "./check-gameover";
import { initialEater, Eater, eatWith } from "./eater";
import { feed, initialFeeder, Feeder } from "./feeder";
import { levelUp } from "./level-up";
import { initialScorer, score, Scorer } from "./scorer";
export interface MainScene extends Scene {
    sides: number
    feeder: Feeder;
    eater: Eater;
    scorer: Scorer
    level: number
    maxLayer: number
    gameOver: boolean;
}

export function updateMainScene(scene: MainScene, dt: number) {
    if (scene.gameOver) { return; }
    checkGameOver(scene); // exit mark dead to main scene game turn it to enter scene

    /* TODO calc level? */
    levelUp(scene);
    const factory = candyFactory(scene.level)
    factory.produce(scene);
    feed(scene, dt)
    const eat = eatWith(factory.isSameType)
    eat(scene, dt)
    score(scene, dt);
}

const defaultScene = {
    sides: 3,
    level: 0,
    maxLayer: 10,
    id: "mainScene",
    viewBox: { width: 400, height: 400 },
    canvasBox: { width: 800, height: 800 },
    gameOver: false
}
export function initialMainScene(
    scene: Partial<MainScene>
): MainScene {

    scene = { ...defaultScene, ...scene };
    scene.sides = scene.sides && scene.sides > 3 ? scene.sides : 3;
    const { fy, ey } = yByViewBox(scene.viewBox as any, scene.sides);
    scene.feeder = scene.feeder ?? initialFeeder(scene.sides ?? defaultScene.sides, fy);
    scene.eater = scene.eater ?? initialEater(scene.sides ?? defaultScene.sides, ey);
    scene.scorer = scene.scorer ?? initialScorer();
    updateMainScene(scene as MainScene, 0)
    return scene as MainScene;
}

export function yByViewBox(size: BoxSize, sides: number): { fy: number, ey: number } {
    const { v: dA } = Rotate.deg2rad({ v: deltaAngle(sides), 'unit': 'deg' });
    const r = Math.min(size.height, size.width) / 2;
    const fy = .8 * r * Math.cos(dA / 2);
    const ey = .2 * fy
    return { fy, ey }
}


export function resizeMainScene(scene: MainScene, size: BoxSize) {

    scene.canvasBox = size
    //TODO process diff size, now set them same 
    scene.viewBox = size
    const { fy, ey } = yByViewBox(size, scene.sides)
    scene.feeder.y = fy
    scene.eater.y = ey

}