const morgan  = require('morgan');
const express = require('express');
const dotenv = require('dotenv');

const employee = require('./routes/employee');
const user = require('./routes/user');

const auth = require('./middelware/auth');
const notFound = require('./middelware/notFound');
const home = require('./middelware/home');
const cors = require('./middelware/cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', home);
app.use('/user', user);
app.use(auth);
app.use('/employee', employee);
app.use(notFound);

app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
})
