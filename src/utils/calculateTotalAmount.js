const prisma = require("./db");

async function calculateTotalAmount() {
    try {
        // Fetch all transactions
        const transactions = await prisma.transaction.findMany();
    
        // Calculate the total amount
        const totalAmount = transactions.reduce((total, transaction) => {
          return total + transaction.amount;
        }, 0);
    
        return totalAmount;
    } catch (error) {
        console.error('Error calculating total amount:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}


module.exports = calculateTotalAmount