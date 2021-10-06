const notificationReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.noti
        case 'REMOVE':
            return state.notification === false
        default:
            return state
    }
}

let timeout = null

export const notification = (notification, time) => {
    return notiFunction => {
        clearTimeout(timeout)
        notiFunction({
            type: 'SET_NOTIFICATION',
            data: {
                noti: notification
            }
        })
        timeout =
            setTimeout(() => {
                notiFunction({
                    type: 'REMOVE',
                })
            }, (time * 1000))
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE'
    }
}

export default notificationReducer