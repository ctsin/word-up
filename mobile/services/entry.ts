import { EntryValues } from "@/interface/createEntry";
import { prisma } from "@/prisma/client";
import { isEmpty } from "lodash";

export const createEntryService = async (entryItem: EntryValues) => {
  const { entry } = entryItem;

  if (isEmpty(entry)) {
    throw new Error("Entry is required");
  }

  try {
    return await prisma.entry.create({ data: entryItem });
  } catch (error) {
    throw new Error(`Entry creation ran into an error: ${error}`);
  }
};
