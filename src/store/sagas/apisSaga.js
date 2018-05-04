import 'regenerator-runtime/runtime'
import { put, call } from 'redux-saga/effects'
import { postApi, getApis, deleteApi } from '../../api'
import * as types from '../../constants/actionTypes'

export function* postApiSaga ({ payload }) {
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

export function* getApisSaga () {
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

export function* deleteApiSaga ({ payload }) {
  try {
    const status = yield call(deleteApi, types.URL, payload)
    yield put({
      type: types.DELETE_API_SUCCESS,
      status,
    })
  } catch (error) {
    yield put({
      type: types.DELETE_API_ERROR,
      status,
    })
  }
}
