import { combineReducers } from 'redux'
import apis from './apisReducer.js'
import ui from './uiReducer.js'

export default combineReducers({
  apis,
  ui
})
