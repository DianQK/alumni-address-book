import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'
import persistState from '../libs/wepy-redux-storage/persistState'

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)
    let returnValue = next(action)
    console.log('state after dispatch', getState())
    return returnValue
  }
}

export default function configStore () {
  let middleware = [promiseMiddleware, logger]
  const store = createStore(rootReducer, compose(applyMiddleware(...middleware), persistState()))
  return store
}
