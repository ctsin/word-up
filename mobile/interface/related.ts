import { Reason } from "@/prisma";

export type UpdateRelatedByID = Partial<{
  entryID: string;
  reason: Reason;
}>;
