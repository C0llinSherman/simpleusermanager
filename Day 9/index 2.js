const express = require('express');
app = express();
const port = process.env.PORT || 2000;
const path = require('path')
fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csv-parser')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("<body style = 'background-color: black'><h1 style = 'color: #dadfea'>good day</h1><div></div></body>");
})

app.get('/time', (req, res) => {
    let today = new Date();
    res.send(`<p>Current Time is: ${today}</p>`);
})

app.get('/samplepage', (req, res) => {
    let file = path.join(__dirname, 'public/data', 'test.html')
    res.sendFile(file)
})

app.get('/input', (req, res) => {
    let file = path.join(__dirname, 'public/data', 'index.html')
    res.sendFile(file)
})

app.post('/input', (req, res) => {
    let lastname = req.body.lastname;
    let firstname = req.body.firstname;
    let email = req.body.email;
    console.log(req.body)
    res.send(`Got it${lastname} ${firstname}, ${email}`)
})

app.listen(port, () => {
    console.log(`server is up. listening on port: ${port}`)
})


app.post('/csvdata', (req, res) => {
    let lastname = req.body.lastname;
    let firstname = req.body.firstname;
    let email = req.body.email;
    console.log(req.body)
    res.send(`Got it${lastname} ${firstname}, ${email}`)
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
                { id: 'firstname', title: 'firstname' },
                { id: 'lastname', title: 'lastname' },
                { id: 'email', title: 'email' },
            ],
            append: true,
        });
        //First,Gender
        //John Jake, M
        //Anna,F

        let today = new Date()
        const entry = [
            {
                entrynumber: count,
                date: today,
                firstname: firstname,
                lastname: lastname,
                email: email
            }];
        csvWriter.writeRecords(entry)

            .then(() => console.log('..DONE'));
    }
})


//CSV Writer

