const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://127.0.0.1:27017/mydata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var db = mongoose.connection

db.on('error', () => {
    console.log("Error connecting to database")
})
db.once('open', () => console.log("Connected to Database"))
app.post("/signUp", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var phno = req.body.phno
    var password = req.body.password

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }

    db.collection('users').insertOne(data, (err, collection) => {
        if(err) {
            throw err
        }
        console.log("Record Inserted Successfully")
    })
    return res.redirect('success.html')
})


app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen(3000)

console.log("Listening on Port 3000")