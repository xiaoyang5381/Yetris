/// <reference types="../types" />
import { MainScene as IMainScene } from "../game-logic/main-scene";
import { Effect } from "./Effect";
import { Game as IGame } from "../game-logic/game"
import { Pad } from "./Pad";
import { Scorer } from "./Scorer";
import { connect } from "react-redux";
import { feederRotateSlice } from "../store/main-scene-slice";
import { Rotate } from "../math/rotate";
import { BackGround } from "./BackGround";
import { RestTimeToFeedCounter } from "./RestTimeToFeedCounter";
import { StyleHTMLAttributes } from "react";
import { throttle } from "lodash";
import { relative } from "path/posix";
import "./Game.css"
export function MainScene(scene: IMainScene & { children: any, highestScore?: number } & RotateButtons) {
    const { viewBox, canvasBox, rotateLeft, rotateRight } = scene
    return <>
        <div className="overlap"
        >
            {scene.children}
            <BackGround   {...scene} />
            <svg
                viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
                width={`${canvasBox.width}px`}
                height={`${canvasBox.height}px`}
            >
                <Effect id={'fx'}></Effect>
                <g filter="url(#fx)">
                <Pad fxId={"fx"} {...scene} />
                <Scorer {...scene} />
                <RestTimeToFeedCounter {...scene} />
                <RotateRight />
                <RotateLeft />
            </g>
            </svg>
            {/* <HighScore score={scene.highestScore ?? '?'} style={{position:`relative`,}}/> */}
        </div>
        <div /* id='l' */ onClick={rotateLeft} style={{ height: `${scene.canvasBox.height}px`, width: `${scene.canvasBox.width / 2}px` }}></div>
        <div /* id='r' */ onClick={rotateRight} style={{ left: `50%`, height: `${scene.canvasBox.height}px`, width: `${scene.canvasBox.width / 2}px` }}></div>

    </>

}


export const ConnectMainScene = connect((game: IGame) => game.mainScene,
    (dispatch): RotateButtons => {
        return {
            rotateLeft: () => { dispatch(feederRotateSlice.actions.rotate(Rotate.Direction.antiClockWise)) },
            rotateRight: () => dispatch(feederRotateSlice.actions.rotate(Rotate.Direction.clockWise))
        };
    }
)(MainScene)

export function StartButton(props: { onClick: () => void } & StyleHTMLAttributes<React.ReactElement>) {
    // onclick start timer send dispatcher timer handle to state:Game
    // TODO respond size
    return <svg
        // className={`button ${}`}
        className={`button ${''}`}
        onClick={props.onClick}

        style={{
            margin: `0 auto`,
            padding: `0`,
            width: '4%',
            height: '3%',
            ...props.style,
        }}
        aria-hidden="true" /*  width="5%" height="2%"  */ preserveAspectRatio="xMidYMid meet" viewBox="0 0 50 50">
        <path fill="#ff00aa" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17zm0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15z" />
        <path fill="#ff00aa" d="M20 33.7V16.3L35 25l-15 8.7zm2-14v10.5l9-5.3l-9-5.2z" />
    </svg>
    // <button style={{
    //      ...son_layout,
    //     top:`50%`,
    //     left:`50%`,
    //     width:`5%`
    //  }} >
    // </button>
    // return <div

    //     style={{
    //         ...son_layout,
    //         zIndex: 10,
    //         top: `50%`,
    //         left: `20%`
    //     }}
    //     className={'button'}
    // >
    // </div>
}


interface RotateButtons {
    rotateLeft: () => void
    rotateRight: () => void
}
export function RotateButton(props: { DirKey: string, onClick: () => void }) {
    return <button onClick={props.onClick}>{props.DirKey}</button>
}

export function RotateRight(props: /* { onClick: () => void } & */ StyleHTMLAttributes<React.ReactElement>) {
    return <svg
        x='80%'
        y='80%'
    // scale={`(4 4)`}
    // style={{
    //     margin: `0 auto`,
    //     padding: `0`,
    //     // display: `inline-block`,

    //     // transform: `scale(4,4) translate(30% 30%)`,
    //     // position: 'absolute',
    //     // top: `120%`, 
    //     // right: `20%`,
    //     // width: '4%',
    //     // height: '3%',
    //     ...props.style,
    // }}
    // transform={`scale(.3 .3)`} 
    >
        <path fill="none" viewBox="0 0 24 24" stroke="yellow" strokeWidth={2} // onClick={props.onClick as any}

            strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>

}
export function RotateLeft(props: /* { onClick: () => void } & */ StyleHTMLAttributes<React.ReactElement>) {
    return <svg
        x='10%'
        y='80%'
    // onClick={props.onClick as any}
    // style={{
    //     margin: `0 auto`,
    //     padding: `0`,
    //     display: `inline-block`,

    //     transform: `scale(4,4)`,
    //     position: 'absolute',
    //     top: `90%`, left: `15%`,
    //     width: '4%',
    //     height: '3%',
    //     ...props.style,
    // }}
    >
        <path
            fill="none" viewBox="0 0 24 24" stroke="yellow" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>

}