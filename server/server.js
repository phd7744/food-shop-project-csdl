const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const foodRouter = require('./router/foods.js');
const accountRouter = require('./router/account.js');
const categoriesRouter = require('./router/categories.js');
const orderRouter = require('./router/orders.js');
const orderDetailRouter = require('./router/order-detail.js');
const customerRouter = require('./router/customer.js');
const dashboardRouter = require('./router/dashboard.js');

app.use('/foods',foodRouter);
app.use('/account',accountRouter);
app.use('/category',categoriesRouter);
app.use('/orders',orderRouter);
app.use('/customers', customerRouter);
app.use('/orderdetail', orderDetailRouter);
app.use('/dashboard', dashboardRouter);






app.listen(port, () => {
    console.log(`Server run at http://localhost:${port}`);
})

