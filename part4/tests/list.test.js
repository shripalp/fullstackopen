const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = ['abc', 'deg', 'err']

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})