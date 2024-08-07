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
            receipt: true,
            category: true
        },
        orderBy: {
            purchaseDate: 'desc'
        }
    })
}

function addTransaction(text, amount, purchaseDate, category) {
    return prisma.transaction.create({
        data: {
            text,
            amount,
            purchaseDate,
            categoryId: category
        }
    })
}

function updateOneTransaction(id, data) {
    return prisma.transaction.update({
        where: {
            id: String(id)
        },
        data: data
    })
}

function deleteOneTransaction(id) {
    return prisma.transaction.delete({
        where: {
            id: String(id)
        }
    })
}

function getOneTransaction(id) {
    return prisma.transaction.findFirst({
        where: {
            id: String(id)
        },
        include: {
            category: true,
            receipt: true
        }
    })
}

module.exports = {
    getAllTransactions,
    addTransaction,
    getLatestMoney,
    updateOneTransaction,
    deleteOneTransaction,
    getOneTransaction
}