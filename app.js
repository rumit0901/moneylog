const express = require('express');

const app = express();
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
const fs = require('fs');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const routes = require('./routes/routes');
const db = mongoose.connection;
dotenv.config();

//connect db
//mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
    console.log('DB connection error:', err.message);
})

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator());

app.use('/', routes)

app.listen(3000, () => {console.log("Server started on http://localhost:"+3000)})

module.exports = app;
/*
/*const todos = [{
    todoId: "1",
    todoTask: "Code",
},
{
    todoId: "2",
    todoTask: "Sleep",
},
{
    todoId: "3",
    todoTask: "Coffee",
}
];

app.get("/", function(req, res) {
    let rawdata = fs.readFileSync('student.json');
    let student = JSON.parse(rawdata);
    res.render('index', {
        data: student
    });

});
app.post("/", (req, res) => {
    var data = fs.readFileSync('student.json');
    var myObject= JSON.parse(data);

    const inputTodoId = myObject.length + 1;
    const inputTodoTask = req.body.todoTask;
    let todo = {todoId: inputTodoId, todoTask: inputTodoTask};
    myObject.push(todo);
    var newData = JSON.stringify(myObject);
    fs.writeFile('student.json', newData, err => {
        // error checking
        if(err) throw err;
        
        console.log("New data added");
    });   
 
    return res.redirect("/");
});

app.listen(3000, (req, res) => {
    console.log("App is running on port 3000");
});
*/