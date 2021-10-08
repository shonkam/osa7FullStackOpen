import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_BLOGS":
            return action.data

        case "CREATE_BLOG":
            return [...state, action.data]

        case "LIKE_BLOG":
            return state

        case "REMOVE_BLOG":
            const removedBlogID = action.data
            const currentState = [...state]
            const newState = currentState.filter(p => p.id !== removedBlogID)
            return newState

        default:
            return state
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        await blogService.like(blog)
        dispatch({
            type: 'LIKE_BLOG',
            data: blog
        })
    }
}

export const removeBlog = id => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = blog => {
    return async dispatch => {
        const createdBlog = await blogService.create(blog)
        dispatch({
            type: "CREATE_BLOG",
            data: createdBlog
        })
    }
}
export default blogReducer