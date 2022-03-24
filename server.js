const express = require('express');

const app = express();


const PORT = process.env.PORT || 8720;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// set up the router
app.get('/', ((req, res) => {
    res.send('API running');
}))