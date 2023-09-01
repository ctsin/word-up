import type { Entry } from "@/prisma";
import { IDictionaries } from "@/interface/dictionary";

export type EntryValues = Omit<Entry, "id">;
export interface Values extends EntryValues {
  dictionaries: IDictionaries | undefined;
  selected:
    | [dictionaryIndex: number, meaningIndex: number, definitionIndex: number]
    | undefined;
}

export type ValuesKey = keyof Values;
