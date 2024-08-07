const prisma = require("../utils/db")

function getLatestMoney(id) {
    return prisma.money.findFirst({
        where: {
            id
        }
    })
}

function getAllTransactions() {
    return prisma.transaction.findMany({
        include: {
            receipt: true
        },
        orderBy: {
            purchaseDate: 'desc'
        }
    })
}

function addTransaction(text, amount, purchaseDate) {
    return prisma.transaction.create({
        data: {
            text,
            amount,
            purchaseDate
        }
    })
}

module.exports = {
    getAllTransactions,
    addTransaction,
    getLatestMoney
}