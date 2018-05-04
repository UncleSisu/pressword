import 'regenerator-runtime/runtime'
import { takeLatest, take } from 'redux-saga/effects'
import { postApiSaga, getApisSaga, deleteApiSaga } from './apisSaga'
import * as types from '../../constants/actionTypes'

export function* watchApiPost () {
  yield takeLatest(types.POST_API, postApiSaga)
}

export function* watchApiGet () {
  yield takeLatest(types.GET_APIS, getApisSaga)
}

export function* watchApiDelete () {
  yield takeLatest(types.DELETE_API, deleteApiSaga)
}
