import type { EntryWithRelated } from "@/prisma";
import { IDictionaries } from "@/interface/dictionary";

export { Entry } from "@/prisma";

export type EntryValues = Omit<EntryWithRelated, "id">;
export interface Values extends EntryValues {
  dictionaries: IDictionaries | undefined;
  selected:
    | [dictionaryIndex: number, meaningIndex: number, definitionIndex: number]
    | undefined;
}

export type ValuesKey = keyof Values;
