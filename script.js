const express = require('express');
const path = require('path')
const app = express()
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csv-parser')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.get('/', (req, res) => {
    res.render('index', {myTitle: 'This is a title', myHeading: 'This is a heading'})
})
app.get('/createUser', (req, res) => {
    res.render('create')
})
app.post('/createUser', (req, res) => {
    let userID = req.body.userID;
    let name= req.body.name;
    let email = req.body.email;
    let age = req.body.age;
    console.log(req.body)
    // res.send(`Got it${userID} ${name}, ${email}, ${age}`)
    res.redirect('/userListing')
    let count = 1
    fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
        count += 1
    })
    .on('end', () => {
        console.log('done parsing the file')
        csvWriter()
    })
    function csvWriter() {
        const csvWriter = createCsvWriter({
            path: 'data.csv',
            header: [
                { id: 'entrynumber', title: 'entrynumber' },
                { id: 'date', title: 'date' },
                { id: 'userID', title: 'userID' },
                { id: 'name', title: 'name' },
                { id: 'email', title: 'email' },
                { id: 'age', title: 'age' },
            ],
            append: true,
        });
        let today = new Date()
        const entry = [
            {
                entrynumber: count,
                date: today,
                userID: userID,
                name: name,
                email: email,
                age: age
            }];
        csvWriter.writeRecords(entry)
            .then(() => console.log('..DONE'));
    }
})

app.get('/userListing', (req, res) => {
    let userArray = [{"name": "John"},{"name": "Mary"}]
    fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log(JSON.stringify(row))
        let temp = []
        // temp = JSON.stringify(row).substring(1).slice(0,-1)
        // console.log(temp.slice(1, -1))
        userArray.push(temp)
    })
    .on('end', () => {
        console.log('done parsing the file')
        console.log(userArray)
    })
    // console.log(userArray)
    res.render('listings', {userArray: userArray})
})

app.get('/editUser', (req, res) => {
    res.render('edit')
})

app.listen(3001, () => {
    console.log('listening on port 3000')
})