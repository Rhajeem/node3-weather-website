const request = require('request')

const geoCode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoicmhhamVlbSIsImEiOiJjazRhNzRzdmIwMTZhM2VxdHEyYWEyMWh4In0.HX1WhFJohd3Am5EPLAdK_A&limit=1";
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to location services", undefined);
      } else if (body.features.length === 0) {
        callback("Location not found. Please enter a valid location", undefined);
      } else {
          callback(undefined, {
              latitude: body.features[0].center[1],
              longitude: body.features[0].center[0],
              location: body.features[0].place_name
          })
      }
    })
  }
  

module.exports = geoCode