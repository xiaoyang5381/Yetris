import { SwitchDispatchProps } from "./Game";
import { MainScene as IMainScene } from "../game-logic/main-scene";
import "./Game.css"
import { HighScore } from "./HighScore";
import { StartButton } from "./MainScene";
export function EnterScene(props: SwitchDispatchProps & { size: BoxSize, highestScore?: number, mainScene: IMainScene }) {
    return <div
        className="scene"
        style={{
            zIndex: 1,
            backgroundColor: `#3f6d6dcc`,
            alignItems: `center`
        }}
    >
        <div
            style={{
                position: `relative`,
                top: '30%',
                textAlign:`center`
            }}
        >
            <h1 className="centeredHeader"
                style={{
                    fontFamily: `IBM Plex Serif`,
                    fontSize: `4em`,
                    'color': `#fa00e5`,
                }}>Yetris</h1>
            <p style={{fontSize:`2em`,color:'#ddd'}}>touch left or right of the screen <br/>
            to rotate the pad for matching 3 </p>

        </div>
        <HighScore score={props.highestScore ?? '?'}
            className="centeredHeader"
            style={
                {

                    zIndex: 1,
                    display: "block",
                    position: `relative`,
                    textAlign: `center`,
                    fontSize: `2.5em`,
                    top: `30%`,
                }
            } />
        <StartButton style={{
            top: `90%`,
            left: '45%',
            transform: `scale(3,3)`, position: 'absolute',
        }} onClick={props.start} />
    </div>
}