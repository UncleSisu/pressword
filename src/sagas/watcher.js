import 'regenerator-runtime/runtime'
import { takeLatest, take } from 'redux-saga/effects'
import { postApiSaga, getApisSaga, deleteApiSaga } from '../subscribersSaga'
import * as types from '../constants/actionTypes'

export function* watchApiPost () {
  console.log('watchApiPost triggered')
  yield takeLatest(types.POST_API, postApiSaga)
}

export function* watchApiGet () {
  console.log('watchApiGet triggered')
  yield takeLatest(types.GET_APIS, getApisSaga)
}

export function* watchApiDelete () {
  console.log('watchApiDelete triggered')
  yield takeLatest(types.DELETE_API, deleteApiSaga)
}

export function* watchApiTest () {
  console.log('watchApiTest triggered')
  yield takeLatest(types.TEST_API, deleteApiSaga)
}
