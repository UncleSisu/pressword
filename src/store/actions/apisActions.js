import * as types from '../../constants/actionTypes'

export const postApiAction = payload => ({
  type: types.POST_API,
  payload,
})

export const deleteApiAction = payload => ({
  type: types.DELETE_API,
  payload,
})

export const getApisAction = () => ({
  type: types.GET_APIS
})
