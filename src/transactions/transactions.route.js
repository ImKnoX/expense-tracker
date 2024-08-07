const { Router } = require('express')
const { addTransaction } = require('./transactions.service')

const router = Router()

router.post('/add', async(req, res, next) => {
    const { text, amount, purchaseDate } = req.body
    const parsedAmount = parseFloat(amount);
    const newData = await addTransaction(text, parsedAmount, purchaseDate)
    try {
        if(newData) {
          res.redirect('/')  
        }
    } catch (error) {
        next(error)
    }
})


router.post('/test', async(req, res, next) => {
    res.json(req.body)
})

module.exports = router;