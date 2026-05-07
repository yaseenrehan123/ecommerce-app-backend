import prisma from "../libs/prisma.js";
async function main() {
    await prisma.user.deleteMany();
    console.log("Database Seeded 1 !")
}
main()
    .finally(async () => {
        console.log("Database Seeded!")
        await prisma.$disconnect();
    });