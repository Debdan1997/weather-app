const request = require('request')

const forecast = (longitude,latitude,callback)=>{
    url = 'https://api.weatherbit.io/v2.0/current?key=1a15331a331f4672af5a4bd3b54254f1&lat='+latitude+'&lon='+longitude

    request({url:url, json:true},(error,{body})=>{
        
        if(error){
           return ('Unable to connect to weather service',undefined)
        } else if (body.data.length===0) {
            return ('Unable to retreive weather',undefined)
        } else {
            callback(undefined,{
                precipitation:body.data[0].precip,
                pressure:body.data[0].pres,
                temperature:body.data[0].temp
            })
        }
    
    })
    
}
module.exports=forecast