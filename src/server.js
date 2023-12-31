import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/webRoutes";
import connectDB from "./config/conectDB";
import cors from "cors";

require("dotenv").config(); // giup chayj dc dong process.env

let app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`The Backend Nodejs is running on the port=${port}: ` + port);
});
