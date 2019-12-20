const path = require('path')
const express = require('express')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require ('./utils/forecast')
const app = express()

//Defines Paths For Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rhajeem C'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rhaj'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'HELP PLZ!',
        name: 'Rhaj'
    })
})

app.get ('/products', (req,res) => {
    if (!req.query.search) {
        return res.send ({
            error: 'Please provide a search term'           
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
    // console.log(req.query.address)
    // res.send({
    //     address: req.query.address,
    //     forcast: 'Cloudy with a chance of rain',
    //     location: 'Kingston, Jamaica'
    // })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Rhaj',
        errorMessage: 'Help page not found! Try again'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Rhaj Craw',
        errorMessage: 'Page not found.'
    })
})


// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})