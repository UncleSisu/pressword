import * as types from '../../constants/actionTypes'

const apisReducer = (state = { }, action) => {
  const { type, status } = action
  switch (type) {
    case types.POST_API_SUCCESS:
    case types.POST_API_ERROR:
    case types.BULK_API_SUCCESS:
    case types.BULK_API_ERROR:
    case types.GET_APIS_SUCCESS:
    case types.GET_APIS_ERROR:
    case types.DELETE_API_SUCCESS:
    case types.DELETE_API_ERROR:
      return {
        ...state,
        apis: status
      }
    default:
      return state
  }
}

export default apisReducer
