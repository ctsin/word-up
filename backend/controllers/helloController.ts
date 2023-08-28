import prisma from "../prisma/client";
import { Request, Response } from "express";

export const helloController = async (req: Request, res: Response) => {
  try {
    const count = await prisma.entry.count();

    res.status(201).json({ message: `Hello World with ${count}` });
  } catch (error) {
    throw new Error(`Entry creation ran into an error: ${error}`);
  }
};
