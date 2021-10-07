import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    blog: blogReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)
    ))

export default store