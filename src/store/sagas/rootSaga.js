import 'regenerator-runtime/runtime'
import { fork } from 'redux-saga/effects'
import { watchApiPost, watchApiGet, watchApiDelete, watchApiBulk } from './watcher'

// Registers watcher saga(s and exports a single generator as root Saga
export default function* startForman () {
  yield fork(watchApiPost)
  yield fork(watchApiGet)
  yield fork(watchApiDelete)
  yield fork(watchApiBulk)
}
