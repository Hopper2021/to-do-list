const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true}));
// Make all items in public readily available
app.use(express.static('server/public'));

// Define router file and create url
let itemRouter = require('./routes/items.js')
app.use('/items', itemRouter);


const PORT = 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});