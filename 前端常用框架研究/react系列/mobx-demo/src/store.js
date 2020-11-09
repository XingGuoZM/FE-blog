
import { observable,action } from "mobx";
import {add, minus} from './action';
let appState = observable({ timer: 0 });


appState.add = action(()=>add(appState));
appState.minus = action(() => minus(appState));

export  default appState;