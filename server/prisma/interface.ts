import { Entry, Prisma } from "@prisma/client";
export type { Related as ReadRelatedTerm } from "@prisma/client";
export type { Entry } from "@prisma/client";
export type Mandarin = Entry["mandarin"];
export type Related = Prisma.RelatedCreateWithoutEntryInput;
export type RelatedCreateInput = Prisma.RelatedCreateInput;
export type RelatedUpdateInput = Prisma.RelatedUpdateInput;
export type EntryUpdateInput = Prisma.EntryUpdateInput;
export { Reason } from "@prisma/client";

const entryWithRelated = Prisma.validator<Prisma.EntryDefaultArgs>()({
  include: { related: true },
});

const entrySelected = { related: true } satisfies Prisma.EntrySelect;
type EntryPayload = Prisma.EntryGetPayload<{ include: typeof entrySelected }>;
export type EntryWithRelated = Prisma.EntryGetPayload<typeof entryWithRelated>;
