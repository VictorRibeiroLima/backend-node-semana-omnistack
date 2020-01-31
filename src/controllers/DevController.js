const DevDAO = require('../dao/DevDAO')
const axios = require('axios')
const parseStringAsArray = require('../utils/parseStringAsArray')
async function index (request, response) {
  const devDAO = new DevDAO()
  const devs = await devDAO.findAll()
  response.json(devs)
}

async function store (request, response) {
  const devDAO = new DevDAO()
  const { github_username, techs, latitude, longitude } = request.body
  try {
    const apiResponse = await axios.get(
      `https://api.github.com/users/${github_username}`
    )
    let {name,login, avatar_url, bio } = apiResponse.data
    if(!bio){
      bio = "This Github user doesn't have a bio" 
    }
    if(!name){
      name = login
    }
    const techsArray = parseStringAsArray(techs)

    const dbResponse = await devDAO.create({
      name,
      avatar_url,
      bio,
      latitude,
      longitude,
      github_username,
      techsArray
    })
    return response.status(dbResponse.status).send(dbResponse.dev)
  } catch (error) {
    console.log(error)
    return response.send('error')
  }
}

module.exports = { store, index }
