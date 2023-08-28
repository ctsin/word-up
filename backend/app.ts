import "colors";
import morgan from "morgan";

import * as bodyparser from "body-parser";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { helloRouter } from "./routes/helloRoute";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;
const debugLog: debug.IDebugger = debug("app");
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to WordUp app");
});

app.use("/hello", helloRouter);

app.listen(PORT, () => {
  debugLog("Debugging ON");

  console.log(
    `Server is running with ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
