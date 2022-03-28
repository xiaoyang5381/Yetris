import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyConveyors, rotateConveyors, rotateConveyorsOne } from "../game-logic/conveyor";
import { Feeder } from "../game-logic/feeder";
import { MainScene, updateMainScene} from "../game-logic/main-scene";
import { deltaAngle } from "../math/angular";
import { Rotate } from "../math/rotate";
import { updateAction } from "./common-actions";
// export function feederSlice(sides:number,y:number) {
// return createSlice({
//     name:"feeder",
//     initialState:initialState,
//     reducers:{},
//     extraReducers(builder){
//     }
// })
// }
// deltaAngle
// export function FeederSlice(mainScene: MainScene) {
//     return createSlice({
//         name: "pad",
//         initialState: {} as S,
//         reducers: {
//             rotate(scene, action: PayloadAction<Rotate.Direction>) {
//                 const dA = deltaAngle(scene.feeder.conveyors.length);
//                 scene.feeder.rotate.v += dA * (action.payload=== Rotate.Direction.clockWise?1:-1)
//             },
//         },
//         // extraReducers(builder){
//         // }
//     })
export const feederRotateSlice =  createSlice({
        name: "rotateFeeder",
        initialState: {} as MainScene,
        reducers: {
            rotate(scene, action: PayloadAction<Rotate.Direction>) {
                const dA = deltaAngle(scene.feeder.conveyors.length);
                scene.feeder.rotate.v += dA * (action.payload=== Rotate.Direction.clockWise?1:-1)
            },
        },
       
    })


export function mainSceneSlice(mainScene: MainScene) {
    return createSlice({
        name: "mainScene",
        initialState: mainScene,
        reducers: {
            rotate(scene, action: PayloadAction<Rotate.Direction>) {
                const sign = action.payload===Rotate.Direction.clockWise?1:-1;
                const {eater:{rotate}}= scene
                Rotate.add(rotate,{unit:'deg', v:sign*deltaAngle(scene.sides)})
                // scene.feeder.rotate = action.payload;
            },
         },
        extraReducers(builder) {
            builder.addCase(updateAction, (scene, action) => {
                updateMainScene(scene, action.payload);
            })
        }
    })
}