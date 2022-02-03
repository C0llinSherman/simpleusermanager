const express = require('express')
const app = express();
const port = process.env.port || 3000;

// const express = require('express');
// const path = require('path')
// const app = express()
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'pug')

// fs = require('fs')
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csv = require('csv-parser')
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index.html')
})

// app.get('/createUser', (req, res) => {
//     let file = path.join(__dirname, 'public/views', 'create.pug')
//     res.sendFile(file)
// })
// app.post('/createUser', (req, res) => {
//     let userID = req.body.userID;
//     let name= req.body.name;
//     let email = req.body.email;
//     let age = req.body.age;
//     console.log(req.body)
//     res.send(`Got it${userID} ${name}, ${email}, ${age}`)
//     let count = 1
//     fs.createReadStream('data.csv')
//         .pipe(csv())
//         .on('data', (row) => {
//             count += 1
//         })
//         .on('end', () => {
//             console.log('done parsing the file')
//             csvWriter()
//         })
//     function csvWriter() {
//         const csvWriter = createCsvWriter({
//             path: 'data.csv',
//             header: [
//                 { id: 'entrynumber', title: 'entrynumber' },
//                 { id: 'date', title: 'date' },
//                 { id: 'userID', title: 'userID' },
//                 { id: 'name', title: 'name' },
//                 { id: 'email', title: 'email' },
//                 { id: 'age', title: 'age' },
//             ],
//             append: true,
//         });
//         //First,Gender
//         //John Jake, M
//         //Anna,F

//         let today = new Date()
//         const entry = [
//             {
//                 entrynumber: count,
//                 date: today,
//                 userID: userID,
//                 name: name,
//                 email: email,
//                 age: age
//             }];
//         csvWriter.writeRecords(entry)

//             .then(() => console.log('..DONE'));
//     }
// })

// // app.get('/userListing', (req, res) => {
// //     res.render('listings')
// // })
// // app.get('/editUser', (req, res) => {
// //     res.render('edit')
// // })

app.listen(3000, () => {
    console.log('listening on port 3000')
})
