import * as types from './constants/actionTypes'

const subscribersReducer = (state = { subscribers: {} }, action) => {
  const { type, status } = action
  switch (type) {
    case types.POST_API_SUCCESS:
    case types.POST_API_ERROR:
    case types.GET_APIS_SUCCESS:
    case types.GET_APIS_ERROR:
    case types.DELETE_API_SUCCESS:
    case types.DELETE_API_ERROR:
      console.log('check subscribers reducer', status);
      return {
        ...state,
        // state: { subscribers: status.subscribers },
        subscribers: status.subscribers
      }
    case types.TEST_API_SUCCESS:
    case types.TEST_API_ERROR:
      console.log('check subscribers reducer', status);
      // find subscribers with test data and update their state object
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
