const logger = require("./logger")
logger.info('middleware')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    

    next()
}
   


const errorHandler = (error, request, response, next) => {
    //logger.error(error.message)
    
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        response.status(400)
    }
    if (error.title === 'ValidationError') {
        response.status(400)
    }
    if (error.name === 'MongoError') {
        response.status(400)
    }
    if (error.name === 'TypeError') {
       response.status(400)
    }
    if (error.message === 'Blog validation failed: title: Path `title` is required.') {
        response.status(400)
     }
    if (error.message.includes('User validation failed: username: Error, expected `username` to be unique.')){
        response.status(400).json('Invalid input')
    }
    if (error.name === 'JsonWebTokenError') {
        response.status(401).json({error: 'invalid token'})
    }
    

    next(error)
  }
 

module.exports = {
    errorHandler,
    tokenExtractor
}
