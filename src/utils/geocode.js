const request = require('request')

geocode = (address,callback)=>{
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGViZGFuYiIsImEiOiJjazhpdzQyb3UwM2phM2htdGZ4ZHB0M2NnIn0.sWjUfcBRj7aHOiEHJPqqfA'
    request({url:url, json:true},(error,{body})=>{

        if(error){
            callback('Unable to connect to location service',undefined)
        } else if (body.features === undefined) {
            callback('Unable to retreive location',undefined)
        } else if(body.features.length === 0){
            callback('No location found',undefined)
        }
        else {  
            callback(undefined,{
                placeName:body.features[0].place_name,
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1]
            })
        }

    })
}


module.exports = geocode