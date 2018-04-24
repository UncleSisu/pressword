import 'regenerator-runtime/runtime'
import { takeLatest, take } from 'redux-saga/effects'
import { postApiSaga, getApisSaga } from '../subscribersSaga'
import * as types from '../constants/actionTypes'

export function* watchApiPost () {
  console.log('watchApiPost triggered')
  yield takeLatest(types.POST_API, postApiSaga)
}

export function* watchApiGet () {
  console.log('watchApiGet triggered')
  yield takeLatest(types.GET_APIS, getApisSaga)
}
