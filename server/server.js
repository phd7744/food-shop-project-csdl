const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

const foodRouter = require('./router/foods.js');
const accountRouter = require('./router/account.js');
const categoriesRouter = require('./router/categories.js');

app.use('/foods',foodRouter);
app.use('/account',accountRouter);
app.use('/category',categoriesRouter);







app.listen(port, () => {
    console.log(`Server run at http://localhost:${port}`);
})

