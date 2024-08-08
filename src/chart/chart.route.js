const { Router } = require('express')
const calculateTotalAmount = require('../utils/calculateTotalAmount')
const { getAllTransactions } = require('../transactions/transactions.service')
const { getAllCategory } = require('../transactions/category.service')
const router = Router()

router.get('/', async(req, res, next) => {
    try {
        const transactions = await getAllTransactions()
        const totals =  await calculateTotalAmount()
        const categories = await getAllCategory()
        const categoryTotals = categories.map(category => {
            const totalAmount = transactions
                .filter(transaction => transaction.categoryId === category.id)
                .reduce((sum, transaction) => sum + transaction.amount, 0);
            return {
                name: category.name,
                totalAmount: totalAmount,
            };
        });
        const labels = categoryTotals.map(ct => ct.name);
        const data = categoryTotals.map(ct => ct.totalAmount);
        res.render('chart', {
            chart: {
                labels,
                data
            }
        })
    } catch (error) {
       next(error) 
    }
})

module.exports = router;