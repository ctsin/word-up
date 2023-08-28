import { Entry } from "@prisma/client";
import { Dictionaries } from "@/interface/dictionary";

export type EntryValues = Omit<Entry, "id">;
export interface Values extends EntryValues {
  dictionaries: Dictionaries | null;
  selected:
    | [dictionaryIndex: number, meaningIndex: number, definitionIndex: number]
    | null;
}

export type ValuesKey = keyof Values;
