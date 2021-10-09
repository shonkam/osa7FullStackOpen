import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)
    ))

export default store