import 'regenerator-runtime/runtime'
import { put, call } from 'redux-saga/effects'
import { postApi, getApis } from './api'
import * as types from './constants/actionTypes'

// Responsible for making PUT request to AWS API gateway
// and then instructing the saga middleware on the next line of action,
// for success or failure
export function* postApiSaga ({ payload }) {
  console.log('putApiSaga payload and url', payload)
  try {
    const status = yield call(postApi, types.URL, payload)
    yield put({
      type: types.POST_API_SUCCESS,
      status,
    })
  } catch (error) {
    yield put({
      type: types.POST_API_ERROR,
      status,
    })
  }
}

// export function* getApisSaga ({ payload }) {
export function* getApisSaga () {
  console.log('getApisSaga triggered', types);
  try {
    const status = yield call(getApis, types.URL)
    yield put({
      type: types.GET_APIS_SUCCESS,
      status,
    })
  } catch (error) {
    yield put({
      type: types.GET_APIS_ERROR,
      status,
    })
  }
}
