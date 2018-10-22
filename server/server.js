const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const ordersRouter = require('./routes/router.orders')
const inventoryRouter = require('./routes/router.inventory')

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/orders', ordersRouter);
app.use('/inventory', inventoryRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});