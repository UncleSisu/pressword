import * as types from './constants/actionTypes'

const subscribersReducer = (state = { subscribers: {} }, action) => {
  const { type, status } = action
  switch (type) {
    case types.POST_API_SUCCESS:
      console.log('check subscribers reducer', status);
      return {
        ...state,
        // state: { subscribers: status.subscribers },
        subscribers: status.subscribers
      }
    case types.POST_API_ERROR:
      return {
        ...state,
        // state: { subscribers: status.subscribers },
        subscribers: status.subscribers
      }
    case types.GET_APIS_SUCCESS:
      console.log('check subscribers reducer', status.subscribers);
      return {
        ...state,
        // state: { subscribers: status.subscribers },
        subscribers: status.subscribers
      }
    case types.GET_APIS_ERROR:
      return {
        ...state,
        // state: { subscribers: status.subscribers },
        subscribers: status.subscribers
      }
    default:
      return state
  }
}

export default subscribersReducer
