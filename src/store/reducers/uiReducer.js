import * as types from '../../constants/actionTypes'

// let initState = {
//   routeVisible: 'construct'
// }
let initState = {
  routeVisible: null
}

const uiReducer = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.ROUTE_VISIBILITY:
      return {
        ...state,
        routeVisible: payload
      }
    default:
      return state
  }
}

export default uiReducer;
