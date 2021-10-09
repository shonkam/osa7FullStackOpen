import loginService from '../services/login'

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data

        case 'SET_USER':
            return action.data

        default:
            return state
    }
}

export const login = credentials => {
    return async dispatch => {
        const response = await loginService.login(credentials)
        console.log(response)
        dispatch({
            type: 'LOGIN',
            data: response
        })
    }
}

export const setUser = user => {
    return dispatch => {
        dispatch({
            type: 'SET_USER',
            data: user
        })
    }
}

export default userReducer