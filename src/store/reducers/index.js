import { combineReducers } from 'redux'
import tabs from './tab'

export default (asyncReducers) => combineReducers({
    tabs,
    ...asyncReducers
})