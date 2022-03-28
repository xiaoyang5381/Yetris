import { SwitchDispatchProps } from "./Game";
import { MainScene as IMainScene } from "../game-logic/main-scene";
import "./Game.css"
import { CurrentScore } from "./CurrentScore";
import { HighScore } from "./HighScore";
import { StartButton } from "./MainScene";
export function GameOverSceneScene(props: SwitchDispatchProps&{ size: BoxSize, highestScore?: number, mainScene: IMainScene } ) {
    const scoreStyle = {
        zIndex: 1,
        display: "block",
        // position:`absolute`,
        textAlign: `center`
    } as any;
    return <div
        className="scene"
        style={{
            zIndex:1,
            backgroundColor:`#3f6d6dcc`,
            alignItems:`center`
        }}
     >
        <h1 className="centeredHeader" 
            style={{fontSize:`4em`,color:'#ddd'}}
        > GameOver</h1>
 <HighScore score={props.highestScore ?? '?'}
            className="centeredHeader"
            style={
                {
                    ...scoreStyle,
                    fontSize: `5em`,
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
                top:`90%`,
                left:'45%',
                transform: `scale(3,3)`,position:'absolute', 
         }} onClick={props.start} />
    </div>
}