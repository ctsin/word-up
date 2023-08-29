import type { Entry } from "@/prisma";
import { Dictionaries } from "@/interface/dictionary";

export type EntryValues = Omit<Entry, "id">;
export interface Values extends EntryValues {
  dictionaries: Dictionaries | undefined;
  selected:
    | [dictionaryIndex: number, meaningIndex: number, definitionIndex: number]
    | undefined;
}

export type ValuesKey = keyof Values;
