const prisma = require("../src/utils/db")

async function main() {
    const uangMama =  prisma.transaction.create({
        data: {
            text: 'Uang Dari Mama',
            amount: 1000000,
            purchaseDate: 'Senin, 15-07-24',
        }
    })
    const alfamartSeed01 = prisma.transaction.create({
        data: {
            text: 'Pakai buat jajan alfamart',
            amount: 22600,
            purchaseDate: 'Rabu, 18-07-24',
        }
    })
    const [uangResult, alfamartSeedResult] = await Promise.all([uangMama, alfamartSeed01])
    console.log({ uangResult, alfamartSeedResult })
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})