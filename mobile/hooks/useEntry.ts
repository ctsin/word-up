import { useEntries } from "@/hooks/useEntries";
import { Entry } from "@/prisma";
import { isUndefined } from "lodash";

export const useEntry = (entryID: Entry["id"] | undefined) => {
  const { data: entries } = useEntries();

  if (isUndefined(entryID)) return null;

  if (isUndefined(entries)) return null;

  return entries.find((entry) => entry.id === entryID)!;
};
