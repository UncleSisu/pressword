import 'regenerator-runtime/runtime'
import { put } from 'redux-saga/effects'
import * as types from '../../constants/actionTypes'

// and then instructing the saga middleware on the next line of action,
// for success or failure
export function* uiSaga ({ payload }) {
  console.log('uiSaga payload', payload)
  try {
    yield put({
      type: types.ROUTE_VISIBILITY,
      status,
    })
  } catch (error) {
    yield put({
      type: types.ROUTE_VISIBILITY,
      status,
    })
  }
}
