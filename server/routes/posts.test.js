const request = require('supertest')
const server = require('../server')

const {getAllPosts} = require('../db/index.js')
jest.mock('../db/index.js')

jest.spyOn(console,'error')

afterEach(() => {
  console.error.mockReset()
})

const fakeData = [
  {
    id: 1,
    title: 'I ate a cow',
    date_eaten: '2022-09-22',
    content: 'this is a very long string that can be changed later',
    img: 'www.googleimages.com/bears',
    user_id: 1,
    date_created: '2022-09-22',
  },
  {
    id: 2,
    title: 'I ate a banana',
    date_eaten: '2022-09-20',
    content: 'this is a very long string that can be changed later',
    img: 'www.googleimages.com/banana',
    user_id: 2,
    date_created: '2022-09-21',
  },
  {
    id: 3,
    title: 'I ate a potato',
    date_eaten: '2022-09-19',
    content: 'this is a very long string that can be changed later',
    img: 'www.googleimages.com/poodle',
    user_id: 3,
    date_created: '2022-09-20',
  },
]

describe("GET /api/v1/posts", () => {
  it('returns status 200 and an array of objects when db function resolves',()=>{
    getAllPosts.mockReturnValue(Promise.resolve(fakeData))
    return request(server)
      .get("/api/v1/posts")
      .then((res)=>{
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(3)
        expect(res.body[0].title).toBe('I ate a cow')
      })
  })
  it('returns status 500 and an error message when db function rejects', () => {
  getAllPosts.mockImplementation(() =>
    Promise.reject(new Error('oh dear, sad'))
  )
  return request(server)
    .get('/api/v1/posts')
    .then((res) => {
      console.log(res)
      expect(res.status).toBe(500)
      expect(res.text).toBe('oh dear, sad')
      return null
    })
})
})
