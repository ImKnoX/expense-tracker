const prisma = require("../src/utils/db")

async function main() {

    const narik = prisma.category.create({
        data: {
            name: 'Penarikan Uang'
        }
    })

    const tagihan = prisma.category.create({
        data: {
            name: 'Tagihan Bulanan'
        }
    })

    const [narikResult, tagihanResult] = await Promise.all([narik, tagihan])
    console.log({ narikResult, tagihanResult })
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