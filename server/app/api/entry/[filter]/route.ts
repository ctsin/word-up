import prisma from "@/prisma/client";
import { isEmpty, isNull } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params: { filter } }: { params: { filter: string } }
) => {
  if (isNull(filter) || isEmpty(filter)) return NextResponse.json([]);

  const entries = await prisma.entry.findMany({
    where: { entry: { contains: filter, mode: "insensitive" } },
    include: { related: true },
  });

  return NextResponse.json(entries);
};
