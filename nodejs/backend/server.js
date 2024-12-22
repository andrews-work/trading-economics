const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// views + ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend', 'views'));

// public folder
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const routes = require('./routes/router.js');
app.use(routes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});