import usersService from '../services/users'

const usersReducer = (state = null, action) => {
    switch (action.type) {
        case 'ALL_USERS':
            return action.data

        default:
            return state
    }
}

export const getAllUsers = () => {
    return async dispatch => {
        const response = await usersService.getAllUsers()
        dispatch({
            type: 'ALL_USERS',
            data: response
        })
    }
}

export default usersReducer