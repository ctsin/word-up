import type {
  Entry,
  EntryWithRelated,
  Mandarin,
  Related as PrismaRelated,
} from "@/prisma";

export type Entries = EntryWithRelated[];

export interface EntryWithReason extends Entry {
  reason: PrismaRelated["reason"] | "";
}

export interface EditEntryValues {
  mandarin: Mandarin;
}
