import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from './reducers/rootReducer'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export default initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  return store
}
