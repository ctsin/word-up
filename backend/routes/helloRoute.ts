import { helloController } from "../controllers/helloController";
import express from "express";

export const helloRouter = express.Router();

helloRouter.get("/", helloController);
