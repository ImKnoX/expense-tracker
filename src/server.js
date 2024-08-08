const express = require("express");
const morgan = require("morgan");
const path = require("path")
const transactionRoutes = require('./transactions/transactions.route')
const chartRoute = require('./chart/chart.route')
const methodOverride = require('method-override');
const app = express()
const port = process.env.PORT || 3000;
const middlewares = require('./middlewares');
const { getAllTransactions } = require("./transactions/transactions.service");
const calculateTotalAmount = require("./utils/calculateTotalAmount");
const { getAllCategory } = require("./transactions/category.service");

//static and views folder locations
const viewsDir = path.join(__dirname, 'views');
const staticDir = path.join(__dirname, 'public');

app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.set('views', viewsDir);
app.use(express.static(staticDir));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.get('/', async(req, res) => {
    const transactions = await getAllTransactions()
    const totals =  await calculateTotalAmount()
    const categories = await getAllCategory()

    res.render('index', {
        data: transactions,
        totals,
        categories
    })
})

app.use('/transactions', transactionRoutes)
app.use('/chart', chartRoute)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.listen(port, () => {
    try {
        console.log(`app is living at http://localhost:${port}`)
    } catch (error) {
        console.error(error)
    }
})