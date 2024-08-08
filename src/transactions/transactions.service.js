const prisma = require("../utils/db")

function getLatestMoney(id) {
    return prisma.money.findFirst({
        where: {
            id
        }
    })
}

/**
 * The function getAllTransactions retrieves all transactions from the database, including related
 * receipt and category information, and orders them by purchase date in descending order.
 * @returns The `getAllTransactions` function is returning an array of transactions fetched from the
 * database using Prisma client. Each transaction object includes related data from the `receipt` and
 * `category` tables. The transactions are ordered by the `purchaseDate` in descending order.
 */
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

/**
 * The function `addTransaction` creates a new transaction entry in a database using the provided text,
 * amount, purchase date, and category.
 * @param text - The `text` parameter is a string that represents the description or name of the
 * transaction. It could be something like "Grocery shopping" or "Gasoline purchase".
 * @param amount - The `amount` parameter in the `addTransaction` function represents the numerical
 * value of the transaction amount. It could be the cost of a purchase, the amount of money
 * transferred, or any other financial value associated with the transaction.
 * @param purchaseDate - The `purchaseDate` parameter in the `addTransaction` function represents the
 * date when the transaction took place. It is typically a date value that indicates when the purchase
 * or transaction occurred.
 * @param category - Category is a reference to the category under which the transaction falls. It
 * could be a unique identifier or name that corresponds to a specific category such as "Groceries",
 * "Entertainment", "Utilities", etc.
 * @returns The `addTransaction` function is returning the result of creating a new transaction using
 * Prisma's `transaction.create` method. The function is passing the provided `text`, `amount`,
 * `purchaseDate`, and `category` values to create a new transaction in the database.
 */
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

/**
 * The function `updateOneTransaction` updates a transaction in the database based on the provided ID
 * and data.
 * @param id - The `id` parameter is the unique identifier of the transaction that you want to update.
 * It is used to locate the specific transaction in the database that you want to modify.
 * @param data - The `data` parameter in the `updateOneTransaction` function represents the new values
 * that you want to update in the transaction with the specified `id`. It should be an object
 * containing the fields and their updated values that you want to change in the transaction. For
 * example, if you want to update
 * @returns The `updateOneTransaction` function is returning the result of updating a transaction in
 * the database using Prisma Client. It updates a transaction with the specified `id` by passing the
 * `data` object containing the new values for the transaction fields. The function returns the updated
 * transaction object.
 */
function updateOneTransaction(id, data) {
    return prisma.transaction.update({
        where: {
            id: String(id)
        },
        data: data
    })
}

/**
 * The function `deleteOneTransaction` deletes a transaction from a database using Prisma based on the
 * provided ID.
 * @param id - The `id` parameter in the `deleteOneTransaction` function is the unique identifier of
 * the transaction that you want to delete from the database. It is used to specify which transaction
 * should be deleted by matching it with the `id` field in the database table.
 * @returns The function `deleteOneTransaction` is returning a promise that will delete a transaction
 * from the database using Prisma client's `transaction.delete` method. The `where` clause specifies
 * the condition for deletion based on the `id` provided as an argument to the function.
 */
function deleteOneTransaction(id) {
    return prisma.transaction.delete({
        where: {
            id: String(id)
        }
    })
}

/**
 * The function `getOneTransaction` retrieves a transaction with a specific ID from a database,
 * including its associated category and receipt.
 * @param id - The `id` parameter is the unique identifier of the transaction you want to retrieve from
 * the database. It is used to query the database and find the transaction with the matching ID.
 * @returns The `getOneTransaction` function is returning a transaction object from the database that
 * matches the provided `id`. The returned transaction object includes the associated category and
 * receipt information as well.
 */
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