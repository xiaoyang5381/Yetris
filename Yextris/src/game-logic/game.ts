import { MainScene, updateMainScene } from "./main-scene"


export interface Game {
    // currentScene?: Scene;
    // scenes: Scene;
    currentScene: SceneNames;

    initialMainScene: MainScene;
    mainScene: MainScene

    tickTock: 'running' | 'stop'
    // timerHandle?: number
    highestScore?: number

    requestLoad?: boolean
    loading?:boolean

    requestSave?: boolean
    saving?:boolean
}
type SceneNames = 'mainScene' | 'enterScene' | 'gameOverScene' | 'pauseScene'
export function initialGame(mainScene: MainScene): Game {
    return {
        currentScene: 'enterScene',
        tickTock: 'stop',
        
        initialMainScene: mainScene,
        mainScene: mainScene,
    }
}

export function startLoad(){}
export function updateGame(game: Game, dt: number) {
    updaters[game.currentScene](game, dt);

}

const updaters: Record<SceneNames, GameUpdater> = {
    enterScene: updateOnEnterScene,
    mainScene: updateOnMainScene,
    gameOverScene: updateOnGameOverScene,
    pauseScene: updateOnPauseScene
}
type GameUpdater = (game: Game, dt: number) => void;
function updateOnEnterScene(game: Game, dt: number) { }
function updateOnMainScene(game: Game, dt: number) {
    if (game.tickTock === 'running') {
        const { mainScene } = game
        updateMainScene(mainScene, dt);
        updateHighestScore(game)
        if (mainScene.gameOver) {
            game.currentScene = "gameOverScene";
        }
    }
}
function updateOnGameOverScene(game: Game, dt: number) { }
function updateOnPauseScene(game: Game, dt: number) { }

export const enum SceneSwitchTypes {
    start = 'start',
    resume = 'resume',
    pause = 'pause',
    // gameOver = 'gameOver',
    exitToEnter = "exitToEnter"
}
export const sceneSwitchers: Record<SceneNames, Record<string, (game: Game) => void>> = {
    enterScene: {
        start(game) {
            game.tickTock='running'
            game.currentScene = 'mainScene';
            refreshMainScene(game);
        },
        resume(game) { game.currentScene = 'mainScene' }
    },
    mainScene: {
        pause(game) { game.currentScene = 'pauseScene';game.tickTock='stop' },
        // gameOver(game){game.currentScene='gameOverScene';},
        exitToEnter(game) { game.currentScene = 'enterScene' },
    },
    gameOverScene: {
        start(game) { 
            game.currentScene = 'mainScene'; 
            refreshMainScene(game) 
        },
        exitToEnter(game) { 
            game.currentScene = 'enterScene'
            refreshMainScene(game) 
        }
    },
    pauseScene: {
        start(game){
            game.tickTock='running'
            game.currentScene = 'mainScene';
            refreshMainScene(game);
        },
        resume(game) {
            game.currentScene = 'mainScene';
        },
        exitToEnter(game) {
            game.currentScene = 'enterScene'
        }
    }
}

function updateHighestScore(game: Game) {
    game.highestScore = Math.max(game.highestScore ?? 0, game.mainScene.scorer.count)
}

function refreshMainScene(game: Game) {
    game.mainScene = game.initialMainScene;
}
// function activeScene(){}
// switch between scenes
// function star(game:Game){
//     if(game.tickTock==='running'){return}
//     else if(game.tickTock==='stop'){
//         if(game)
//         refreshMainScene(game);
//         game.currentScene = 'mainScene'
//     }
//     else{/*  */}
// }
// resume = start - refresh 
// pause = stop - refresh 
// exit = stop + refresh

// 
// what you need just = start + stop + refresh + (load+save state)
// function resume(game:Game){
//     if(game.tickTock ==='running'){
//         game.currentScene = 'mainScene'
//     }
//     else{/* */}
// }

// function exit(game:Game){
//     if(!game.mainScene.gameOver){
//         // save it
//     }
// }
// function pause(game:Game){
//     if(!game.mainScene.gameOver && game.currentScene==='mainScene'){

//         game.currentScene = 'pauseScene';
//         // save it
//     }
// }
// function 