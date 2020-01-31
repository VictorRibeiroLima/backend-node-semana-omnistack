const parseStringAsArray = require('../utils/parseStringAsArray')
const DevDAO = require('../dao/DevDAO')
async function index (request, response) {
  try{
  console.log(request.query)
  const devDAO = new DevDAO()
  const { latitude, longitude, techs } = request.query
  const techsArray = parseStringAsArray(techs)
  const devs = await devDAO.findByTechsAndCoordinates({latitude,longitude,techsArray})
  return response.json(devs)
  }catch(error){
    console.error(error)
    return response.status(400).send()
  }
}
module.exports = {index}