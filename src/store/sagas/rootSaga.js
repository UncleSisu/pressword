import 'regenerator-runtime/runtime'
import { fork } from 'redux-saga/effects'
import { watchApiPost, watchApiGet, watchApiDelete, watchApiTest } from './watcher'

// Registers watcher saga(s and exports a single generator as root Saga
export default function* startForman () {
  console.log('foreman running?')
  yield fork(watchApiPost)
  yield fork(watchApiGet)
  yield fork(watchApiDelete)
  yield fork(watchApiTest)
}
