
const totalLikes = (blogs) => blogs.map(i => i.likes).reduce((a,b) => a+b)

module.exports = {
  totalLikes
}