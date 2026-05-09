import prisma from "../libs/prisma.js";
async function main() {
    await prisma.user.deleteMany();
}
main()
    .finally(async () => {
        console.log("Database Seeded!")
        await prisma.$disconnect();
    });