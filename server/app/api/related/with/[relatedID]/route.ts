import prisma from "@/prisma/client";
import { RelatedUpdateInput } from "@/prisma/interface";
import { Reason } from "@prisma/client";
import { isEmpty, isNil, isUndefined } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params: { relatedID } }: { params: { relatedID: string } }
) => {
  if (isNil(relatedID) || isEmpty(relatedID)) return NextResponse.json([]);

  const related = await prisma.related.findUnique({
    where: { id: relatedID },
    include: {
      connectToTerm: {
        select: {
          entry: true,
        },
      },
    },
  });
  return NextResponse.json(related);
};

export type UpdateRelatedByID = Partial<{
  entryID: string;
  reason: Reason;
}>;

export const PATCH = async (
  request: NextRequest,
  { params: { relatedID } }: { params: { relatedID: string } }
) => {
  if (isNil(relatedID) || isEmpty(relatedID))
    return NextResponse.json({ message: "Related term's ID is required." });

  const { entryID, reason }: UpdateRelatedByID = await request.json();

  const getRelatedUpdateInput = (): RelatedUpdateInput => {
    if (!isUndefined(entryID)) {
      return {
        connectToTerm: {
          connect: {
            id: entryID,
          },
        },
      };
    }

    return {
      reason,
    };
  };

  const related = await prisma.related.update({
    where: { id: relatedID },
    data: getRelatedUpdateInput(),
    include: {
      connectToTerm: {
        select: {
          entry: true,
        },
      },
    },
  });
  return NextResponse.json(related);
};

export const DELETE = async (request: NextRequest) => {
  const payload: string[] = await request.json();

  if (isEmpty(payload))
    return NextResponse.json({ message: "Related term's ID is required." });

  const deleted = await prisma.related.deleteMany({
    where: {
      id: {
        in: payload,
      },
    },
  });

  return NextResponse.json(deleted);
};
