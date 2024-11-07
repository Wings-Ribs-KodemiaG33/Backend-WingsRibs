
const axios = require('axios')

async function getCoordinates(address) {
    const apiKey = process.env.GOOGLE_MAPS_KEY
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const location = response.data.results[0].geometry.location;
    return location;
} 

