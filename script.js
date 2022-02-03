const express = require('express');
const path = require('path')
const app = express()
const fs = require('fs')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')


app.get('/', (req, res) => {
    res.render('index')
})
app.get('/createUser', (req, res) => {
    let users = fs.readFileSync('./users.json')
    users = JSON.parse(users)
    let userIDCount = +(users["userCount"]) + 1
    res.render('create', {countKey: userIDCount})
})
app.post('/createUser', (req, res) => {
    let users = fs.readFileSync('./users.json')
    users = JSON.parse(users)
    let countKey = +(users['userCount'])
    const newUser = req.body
    users[req.body.userID] = newUser
    users["userCount"] = countKey + 1
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))
    res.redirect('/userListing')
})

app.get('/userListing', (req, res) => {
    let users = fs.readFileSync('./users.json')
    users = JSON.parse(users)
    delete users['userCount']
    res.render('listings', {userArray: users})
})

app.get('/editUser/:id', (req, res) => {
    let users = fs.readFileSync('./users.json')
    users = JSON.parse(users)
    let userID = req.params.id;
    if(!users[userID]){
        res.send("User does not Exist")
    }
    let currentUser = users[userID]
    res.render('edit', {currentUser: currentUser})
})

app.post('/deleteUser/:id', (req, res) => {
    let users = fs.readFileSync('./users.json')
    users = JSON.parse(users)
    let userID = req.params.id;
    delete users[userID]
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))
    console.log(users)
    res.redirect('/userListing')
})

app.get('/*', (req,res) => {
    res.send("This page does not exist")
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})