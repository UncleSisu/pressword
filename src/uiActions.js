import * as types from './constants/actionTypes'

// Returns action type and PUT_FORM
export const setVisibilityAction = payload => ({
  type: types.ROUTE_VISIBILITY,
  payload
})
