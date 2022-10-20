const dummy = (blogs) => {
  blogs.map(i => i.likes)
  return 1
}

const totalLikes = (blogs) => blogs.map(i => i.likes).reduce((a,b) => a+b)

const favoriteBlog = (blogs) => {
  const likesArray = blogs.map(i => i.likes)
  return Math.max(...likesArray)
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}

