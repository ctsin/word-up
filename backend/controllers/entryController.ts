import { EntryValues } from "@/interface/createEntry";
import { prisma } from "@/prisma/client";
import { Request, Response } from "express";
import { isEmpty } from "lodash";

export const entryController = async (
  { params }: Request<EntryValues>,
  res: Response
) => {
  const { entry } = params;

  if (isEmpty(entry)) {
    throw new Error("Entry is required");
  }

  try {
    const created = await prisma.entry.create({ data: params });
    res.status(201).json(created);
  } catch (error) {
    throw new Error(`Entry creation ran into an error: ${error}`);
  }
};
