const express = require('express')   
const app = express()        
const bodyParser = require("body-parser")
const MongoClient = require('mongoose')
 require('dotenv').config();
// const connectionString = 'mongodb+srv://hadarsalame_plus:X6woq9OUWSJfcTxU@cluster0.77174fm.mongodb.net/retryWrites=true&w=majority'
const notFound = require('./Middleware/not-found');
const errorHandlerMiddleware = require('./Middleware/error-handler');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","PUT")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

// middleware

app.use(express.static('./public'));
app.use(express.json());

// routes

const user_route = require("./Routers/userRoute")
app.use('/api/v1/user', user_route)

const month_route = require("./Routers/monthRouter")
app.use('/api/v1/month', month_route)

const expenses_route = require("./Routers/expenseRouter")
app.use('/api/v1/expense', expenses_route)

const income_route = require("./Routers/incomeRouter")
app.use('/api/v1/income', income_route)

const target_route = require("./Routers/targetRouter")
app.use('/api/v1/target', target_route)

const category_route = require("./Routers/categoryRouter")
app.use('/api/v1/category', category_route)

const connectionString = process.env.MONGO_URL;

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 3030
MongoClient.connect(connectionString)
    .then(client => {
    console.log(`Connected to Database`)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    // const db = client.db('to-do-app')
    // const tasksCollection = db.collection('tasks')
    })

//CRUD requests

    .catch(error => console.error(error))