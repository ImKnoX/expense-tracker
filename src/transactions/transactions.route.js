const { Router } = require('express')
const { 
    addTransaction, 
    updateOneTransaction, 
    deleteOneTransaction, 
    getOneTransaction
} = require('./transactions.service')

const router = Router()

router.get('/:id', async(req, res, next) => {
    const { id } = req.params;
    const results = await getOneTransaction(id)
    try {
        res.json(results)
    } catch (error) {
        next(error)
    }
})

router.post('/add', async(req, res, next) => {
    const { text, amount, purchaseDate, category } = req.body
    const parsedAmount = parseFloat(amount);
    const parsedCategory = parseInt(category)
    const newData = await addTransaction(text, parsedAmount, purchaseDate, parsedCategory)
    try {
        if(newData) {
          res.redirect('/')  
        }
    } catch (error) {
        next(error)
    }
})

router.delete("/delete/:id", async(req, res, next) => {
    const { id } = req.params;
    const data = await deleteOneTransaction(id)
    try {
        if(data) {
            res.redirect('/')
        }
    } catch (error) {
        next(error)
    }
})

router.patch("/update/:id", async(req, res, next) => {
    const { text, amount, purchaseDate } = req.body;
    const { id } = req.params;
    amount = parseFloat(amount)
    const updateData = await updateOneTransaction(id, { text, amount, purchaseDate })
    try {
        if(updateData) {
            res.redirect('/')
        }
    } catch (error) {
        next(error)
    }
})

//for testing new features
router.post('/test', async(req, res, next) => {
    res.json(req.body)
})

module.exports = router;