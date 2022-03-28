import { MainScene as IMainScene } from "../game-logic/main-scene";
import { ExitButton } from "./Buttons";
import { CurrentScore } from "./CurrentScore";
import {  SwitchDispatchProps } from "./Game";
import "./Game.css"
import { HighScore } from "./HighScore";
import { StartButton } from "./MainScene";
export function PauseScene(props: SwitchDispatchProps & { size: BoxSize, highestScore?: number, mainScene: IMainScene }) {
    const scoreStyle = {
        zIndex: 1,
        display: "block",
        // position:`absolute`,
        textAlign: `center`
    } as any;
    return <div
        className="scene"
        style={{
            zIndex: 1,
            backgroundColor: `#3f6d6dcc`,
            alignItems: `center`
        }}
    >
        <h1
            className="centeredHeader"
            style={{
                fontSize: `3em`,
                'color': `#b1b1be`
            }}
        > Pause
        </h1>
        <HighScore score={props.highestScore ?? '?'}
            className="centeredHeader"
            style={
                {
                    ...scoreStyle,
                    fontSize: `5em`,
                    // top:`30%`,
                }
            } />
        <CurrentScore
            className=""
            style={{
                ...scoreStyle,

                fontSize: `2em`,
                top: `20%`
            }}
            score={props.mainScene.scorer.count}
        />


        <StartButton style={{

            top: `90%`,
            left: '45%',
            transform: `scale(3,3)`, position: 'absolute',
        }} onClick={props.start} />

        <ExitButton style={{ top: `10%`, right: `10%`, float: `left` }} onClick={props.exitToEnter} />
    </div>
}