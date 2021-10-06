const logger = require("./logger")

const dummy = () => {
    return 1
  }

const likes = (blogs) => {
   
    logger.info(blogs[0])
    
    
    return blogs[0] === undefined
    ? 'empty'
    : blogs.reduce((totalCount, blogs) => totalCount + blogs.likes, 0)
}
  

const favoriteBlog = (blogs) => {
    let sortedBlog = [...blogs].sort((a, b) => b.likes - a.likes)
    return ({"title": sortedBlog[0].title ,"author": sortedBlog[0].author, "likes": sortedBlog[0].likes})
}
  module.exports = {
    dummy,
    likes,
    favoriteBlog,
  }