import { combineReducers } from 'redux'
// import ui from './components/uiReducer'
import subscribers from './subscribersReducer.js'
import ui from './uiReducer.js'

// state: contactReducer,
export default combineReducers({
  subscribers,
  ui
})
