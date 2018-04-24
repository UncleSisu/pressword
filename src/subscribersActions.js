import * as types from './constants/actionTypes'

// Returns action type and PUT_FORM
export const postApiAction = payload => ({
  type: types.POST_API,
  payload,
})

// export const getApisAction = payload => ({
//   type: types.GET_APIS,
//   payload,
// })

export const getApisAction = () => ({
  type: types.GET_APIS
})
