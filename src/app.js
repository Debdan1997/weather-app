const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.use(express.static(publicDirectory))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Debdan'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide some address'
        })
        
    }
    geocode(req.query.address,(error,{placeName,longitude,latitude}={})=>{
        console.log(error)
        if(error){
            res.send({
                error:error
            })
        }else{
            forecast(longitude,latitude,(error,{precipitation,pressure,temperature=0}={})=>{
                if(error){
                    res.send({
                        error:error
                    })
                }else{
                    // console.log('Showing weather for '+placeName)
                    // console.log('Current temperature:'+temperature)
                    // console.log('Current pressure:'+pressure)
                    // console.log('Current precipiation:'+precipitation)
                    res.send({
                        placeName:placeName,
                        temperature:temperature,
                        pressure:pressure,
                        precipitation:precipitation
                    })
                }
            })
        }
        
    })
    
    // res.send({ 
    //     location:req.query.address,
    //     temperature:'15'
    // })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Debdan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Debdan'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('pagenotfound',{
        message:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('pagenotfound',{
        message:'404 page not found'
    })
})






app.listen(3000,()=>{
    console.log('server started.')
})
