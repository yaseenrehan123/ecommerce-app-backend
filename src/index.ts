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
        origin: ["http://localhost:8081", "http://10.0.2.2:8081", "http://192.168.x.x:8081"],
        credentials: true
    }));
    app.use(express.urlencoded());
    app.use(express.json());
    //app.use(cookieParser());

    app.use("/users/create", createUserRouter)

    app.listen(
        PORT,
        "0.0.0.0",
        async () => {
            console.log(`It's alive on http://localhost:${PORT}`);
        }
    );



}
