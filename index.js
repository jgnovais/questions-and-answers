const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Ask = require("./database/Ask");

connection
    .authenticate()
    .then(() => {
        console.log('connection is ok');
    })
    .catch((error) => {
        console.log('deu erro');
        console.log(error);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get("/", (req, res) => {
    Ask.findAll({ raw: true}).then( asks => 
        {
            res.render("index", {asks: asks});
        });
});

app.get('/ask', (req, res) => {
    res.render("ask", {});
})

app.post('/ask', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;

    Ask.create({
        title: title,
        description: description
    }).then(() => {
        res.send("Form has been recieved: Title " + title + " Description " + description);
    })
})

app.listen(8080,()=>{console.log("Server is ok.");});