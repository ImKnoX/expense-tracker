const prisma = require("../src/utils/db")

async function main() {

   const saldo = prisma.money.create({
    data: {
        text: 1074894
    }
   })

    const [saldoResult] = await Promise.all([saldo])
    console.log({ saldoResult })
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