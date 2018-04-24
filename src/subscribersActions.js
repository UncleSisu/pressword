import * as types from './constants/actionTypes'

// Returns action type and PUT_FORM
export const postApiAction = payload => ({
  type: types.POST_API,
  payload,
})

export const deleteApiAction = payload => ({
  type: types.DELETE_API,
  payload,
})

export const testApiAction = payload => ({
  type: types.TEST_API,
  payload,
})

export const getApisAction = () => ({
  type: types.GET_APIS
})
