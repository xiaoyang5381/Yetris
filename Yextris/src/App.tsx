import './App.css';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { initialGame, SceneSwitchTypes } from './game-logic/game';
import { initialMainScene } from './game-logic/main-scene';
// import { updateAction } from './store/common-actions';
import { createGameSlice, createTimer } from './store/game-slice';
import { Game, ResizeDispatchProps, SwitchDispatchProps } from './components/Game';
import {Game as IGame} from "./game-logic/game"
import { updateAction } from './store/common-actions';
export function App() {
  return (
    <Provider store={store}>
      <ConnectedGame/>
    </Provider>
  );
}

export default App;
const slice =createGameSlice(initialGame(initialMainScene({
  sides: 6,
  canvasBox:{
    width: Math.min(Math.max(360,window.innerWidth),480),
    height:Math.min(Math.max(680,window.innerHeight),860)
  },
  viewBox:{
    width: Math.min(Math.max(360,window.innerWidth),480),
    height:Math.min(Math.max(680,window.innerHeight),860)
  },
  maxLayer: 8
})))
const store = createStore(slice.reducer);
const timer = createTimer(1000/60,updateAction)
timer(store);
export const ConnectedGame  =connect((state:IGame)=>state,(dispatch):SwitchDispatchProps&ResizeDispatchProps=>{
  return  {
    start: function (): void {
      dispatch(slice.actions.switchScene(SceneSwitchTypes.start))
    },
    resume: function (): void {
      dispatch(slice.actions.switchScene(SceneSwitchTypes.resume))
    },
    pause: function (): void {
      dispatch(slice.actions.switchScene(SceneSwitchTypes.pause))
    },
    exitToEnter: function (): void {
      dispatch(slice.actions.switchScene(SceneSwitchTypes.exitToEnter))
    },
    resize:function(size:BoxSize) :void{
      dispatch(slice.actions.resize(size))
    }
  }
})(Game)

