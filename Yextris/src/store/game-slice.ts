import { ActionCreator, ActionCreatorWithPayload, ActionReducerMapBuilder, AnyAction, createAction, createEntityAdapter, createSelector, createSlice, createStore, EntityState, PayloadAction, Selector, Slice, Store } from "@reduxjs/toolkit";
import { copyFileSync } from "fs";
import { is } from "immer/dist/internal";
import { forEach, isBoolean, isNil, runInContext } from "lodash";
import { Game, sceneSwitchers, SceneSwitchTypes, updateGame } from "../game-logic/game";
import { MainScene, resizeMainScene, yByViewBox } from "../game-logic/main-scene";
import { assert } from "../utils";
import { updateAction } from "./common-actions";
// import { updateAction } from "./common-actions";
import { feederRotateSlice } from "./main-scene-slice";


export function createGameSlice(initial: Game) {
    return createSlice({
        name: "game",
        initialState: initial,
        reducers: {
            startLoad(game) {
                // if (!isNil(game.requestLoad) && game.requestLoad === true) {
                //     game.requestLoad = false
                // }
            },
            loadSuccess(game, action: PayloadAction<MainScene>) {
                //    TODO
                game.mainScene = action.payload
            },
            loadFail(game) { },
            startSave(game) { },
            saveSuccess(game, action: PayloadAction<MainScene>) { },
            saveFail(game) { },


            switchScene(game, action: PayloadAction<SceneSwitchTypes>) {
                const switcher = sceneSwitchers[game.currentScene][action.payload]
                if (!isNil(switcher)) { switcher(game); }
            },
            resize(game,action:PayloadAction<BoxSize>){
                const _toSize: BoxSize = {
                    width: Math.min(Math.max(360,action.payload.width),480),
                    height:Math.min(Math.max(680,action.payload.height),860)
                }
                // TODO
                resizeMainScene(game.mainScene,_toSize)
                resizeMainScene(game.initialMainScene,_toSize)
            }
        },

        extraReducers: (builder) => {
            builder.addCase(updateAction, (game, action) => {
                if (game.tickTock === 'running' && updateAction.match(action)) {
                    updateGame(game, action.payload)
                }
            })
            .addCase(feederRotateSlice.actions.rotate,(game,action)=>{
                    if(game.tickTock ==='running' && game.currentScene==='mainScene'){
                        feederRotateSlice.reducer(game.mainScene,action)
                    }
            })
        }
    })
}
export function sceneLoader(
    { startLoad, loadSuccess, loadFail }: { startLoad: ActionCreator<AnyAction>; loadSuccess: ActionCreatorWithPayload<MainScene>; loadFail: ActionCreator<AnyAction>; }) {
    return async (store: Store<Game>) => {
        const game = store.getState();
        if (isBoolean(game.requestLoad) && !game.requestLoad) {
            // load history
            store.dispatch(startLoad())
            try {
                const mainScene = await loadMainScene();
                store.dispatch(loadSuccess(mainScene))
            }
            catch (err) {
                store.dispatch(loadFail())
            }
        }

    }
}
declare function loadMainScene(): Promise<MainScene>;
export function gameSaver({ startSave, saveSuccess, saveFail }: { startSave: ActionCreator<AnyAction>; saveSuccess: ActionCreator<AnyAction>; saveFail: ActionCreator<AnyAction>; }) {
    return async (store: Store<Game>) => {
        const game = store.getState();
        if (isBoolean(game.requestLoad) && !game.requestLoad) {
            // load history
            store.dispatch(startSave())
            try {
                await saveGame(game);
                store.dispatch(saveSuccess())
            }
            catch (err) {

                store.dispatch(saveFail())
            }
        }

    }
}

// the first time start the game could be store.dispatch(xxx.start)
declare function saveGame(game: Game): Promise<void>

export function createTimer(dt: number, updateAction: ActionCreatorWithPayload<number> ) {
    return (store: Store<Game>) => {
        let hd = 0;
        let registered = false;
        store.subscribe(() => {
            const game = store.getState();
            if (game.tickTock === 'stop') { 
                if(registered){
                    registered=false
                        window.cancelAnimationFrame(hd)
                        // clearInterval(hd)
                }
                return; 
            }
            else{
                if(registered){return;}
                else{
                    registered=true
                    const handle = () =>{
                        store.dispatch(updateAction(dt))
                        hd = window.requestAnimationFrame(handle)
                    } 
                    handle()
                }
            }
        })
    }
}