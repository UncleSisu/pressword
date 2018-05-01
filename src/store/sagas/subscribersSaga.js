import 'regenerator-runtime/runtime'
import { put, call } from 'redux-saga/effects'
import { postApi, getApis, deleteApi } from '../../api'
import * as types from '../../constants/actionTypes'

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

export function* testApiSaga ({ payload }) {
  console.log('testApiSaga payload and url', payload)
  try {
    const status = yield call(testApi, types.URL, payload)
    yield put({
      type: types.TEST_API_SUCCESS,
      status,
    })
  } catch (error) {
    yield put({
      type: types.TEST_API_ERROR,
      status,
    })
  }
}

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

export function* deleteApiSaga ({ payload }) {
  console.log('deleteApiSaga payload and url', payload)
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
