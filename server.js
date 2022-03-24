const express = require('express');
const connectDB = require('./config/db');


const app = express();
// connect database
connectDB();


const PORT = process.env.PORT || 8720;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// set up the router
app.get('/', ((req, res) => {
    res.send('API running');
}))