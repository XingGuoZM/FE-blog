import {createStore} from 'redux'
import helloWorld from './reducers/index'

let store=createStore(helloWorld)

export default store
