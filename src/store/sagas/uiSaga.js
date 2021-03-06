import 'regenerator-runtime/runtime'
import { put } from 'redux-saga/effects'
import * as types from '../../constants/actionTypes'

export function* uiSaga ({ payload }) {
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
