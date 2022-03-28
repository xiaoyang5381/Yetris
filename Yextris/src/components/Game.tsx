import React, { StyleHTMLAttributes, useEffect, useState } from "react";
import { Game as IGame, SceneSwitchTypes } from "../game-logic/game"
import { ConnectMainScene, } from "./MainScene";
import "./Game.css"
import { EnterScene } from "./EnterScene";
import { PauseScene } from "./PauseScene";
import { GameOverSceneScene } from "./GameOverScene";
import { PauseButton } from "./Buttons";
export type SwitchDispatchProps = Record<SceneSwitchTypes, () => void>;
export type ResizeDispatchProps = { resize: (size: BoxSize) => void }


export function Game(game: IGame & SwitchDispatchProps & ResizeDispatchProps) {
    const size = useWindowSize(game.resize)
    const scenes: Record<typeof game['currentScene'], () => JSX.Element> =
    {
        mainScene: () => <>
            <ConnectMainScene {...game.mainScene} {...game}  >
            </ConnectMainScene>,
            <PauseButton style={{ top: `90%`, left: `45%`, }} onClick={game.pause} />
            {/* <HighScore score={game.highestScore ?? '?'} /> */}
        </>,
        enterScene: () => <>
            <ConnectMainScene {...game.mainScene} > </ConnectMainScene>
            <EnterScene {...game} size={game.mainScene.canvasBox}></EnterScene>
            {/* <HighScore score={game.highestScore ?? '?'} style={{ }} /> */}
        </>
        ,
        gameOverScene: () => <>
            <ConnectMainScene {...game} > </ConnectMainScene>
            <GameOverSceneScene size={game.mainScene.canvasBox} {...game} />
        </>,
        pauseScene: () => <>
            <ConnectMainScene {...game.mainScene} > </ConnectMainScene>
            <PauseScene size={game.mainScene.canvasBox} {...game} />
        </>,
    }

    return (<div
        className={'overlap'}
        style={{
            width: `${game.mainScene.canvasBox.width}px`,
            height: `${game.mainScene.canvasBox.height}px`,
            margin:`auto`
        }}
    >
        {scenes[game.currentScene]()}
    </div>
    )
}

// see https://stackoverflow.com/questions/62846043/react-js-useeffect-with-window-resize-event-listener-not-working
function useWindowSize(resize: ResizeDispatchProps['resize']) {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            resize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

