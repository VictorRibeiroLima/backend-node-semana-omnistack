const Dev = require('../models/Dev')
class DevDAO {
  async findAll () {
    return Dev.find()
  }

  async findByTechsAndCoordinates ({ techsArray, latitude, longitude }) {
    return Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    })
  }

  async findByGithubUsername (github_username) {
    return Dev.findOne({ github_username })
  }

  async create ({
    longitude,
    latitude,
    github_username,
    techsArray,
    name,
    avatar_url,
    bio
  }) {
    const dev = await this.findByGithubUsername(github_username)
    if (dev) {
      return {status: 400, dev:'user alrady in database'}
    }
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    return {status: 200,dev: await Dev.create({
      github_username,
      techs: techsArray,
      name,
      avatar_url,
      bio,
      location
    })
  }}
}

module.exports = DevDAO