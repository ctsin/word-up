import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { isEmpty, isNil } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params: { entryID } }: { params: { entryID: string } }
) => {
  if (isNil(entryID) || isEmpty(entryID)) return NextResponse.json([]);

  const related = await prisma.related.findMany({
    where: { entryID },
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