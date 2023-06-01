import express from "express";
import session from "express-session"
import dotenv from "dotenv"
import cors, { CorsOptions } from "cors"
import bodyParser from "body-parser";
import authRoute from "./routes/auth-routes"
import todoRoute from "./routes/todo-routes"
import dbConnect from "./db/dbConnect";
import cookieParser from "cookie-parser"
const CustomeErrorHandler = require("./service/custom-error");
const errorHandler = require("./middleware/ErrorHandler.js");


dotenv.config();
const app = express();
const corsOptions: CorsOptions = {
    origin: [
        `${`http://127.0.0.1:5173`}`,
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/auth", authRoute)
app.use("/api/todo", todoRoute)

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    dbConnect();
    console.log("connected to the server", PORT);
})