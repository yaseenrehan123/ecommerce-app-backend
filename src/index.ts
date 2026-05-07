import express from "express";
import createUserRouter from "./routes/users/createUser.js";
import prisma from "./libs/prisma.js";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = 8081;

//console.log("DB URL:", process.env.DATABASE_URL);
//console.log("PRISMA USER:", prisma?.user)
main()
    .catch((e: Error) => {
        console.error(e.message);
    })
    .finally(async () => {
        prisma.$disconnect();
    })


async function main() {
    app.use(cors({
        origin: ["http://localhost:5173", "https://frontend-ha4p.onrender.com"],
        credentials: true
    }));
    app.use(express.urlencoded());
    app.use(express.json());
    //app.use(cookieParser());

    app.listen(
        PORT,
        async () => {
            console.log(`It's alive on http://localhost:${PORT}`);
        }
    );

    app.use("/users/create", createUserRouter)

}
