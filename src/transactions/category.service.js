const prisma = require("../utils/db")

function getAllCategory() {
    return prisma.category.findMany()
}

module.exports = {
    getAllCategory
}