const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDb = require('./config/db')
const PORT = process.env.PORT || 8000

// connect to db
connectDb();

const app = express();

// parse the body of the request
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.json({message: 'HELLO'})
})

// routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
