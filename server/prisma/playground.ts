import { Prisma } from "@prisma/client";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { isEmpty } from "lodash";

// 和下面的一样
const entryCreateArgs = {
  entry: "",
  partOfSpeech: { definition: "", partOfSpeech: "" },
  related: {
    connectOrCreate: { where: { id: "" }, create: { reason: "FORM" } },
  },
} satisfies Prisma.EntryCreateArgs["data"];

const entryUpdateInput = {
  related: {
    upsert: {
      where: { id: "" },
      update: { reason: "FORM" },
      create: { reason: "FORM" },
    },
  },
} satisfies Prisma.EntryUpdateInput;

const entryCreateInput0 = {
  entry: "",
  related: {
    connectOrCreate: { where: { id: "" }, create: { reason: "FORM" } },
  },
  partOfSpeech: { set: { definition: "", partOfSpeech: "" } },
} satisfies Prisma.EntryCreateInput;

const entryCreateInput1 = {
  entry: "",
  related: {
    connectOrCreate: { where: { id: "" }, create: { reason: "FORM" } },
  },
  partOfSpeech: { set: { definition: "", partOfSpeech: "" } },
};

type X = Prisma.Args<typeof prisma.entry, "create">["data"];
const x: X = { entry: "", partOfSpeech: { definition: "", partOfSpeech: "" } };

const entryCreateInput2 = Prisma.validator<typeof entryCreateInput1>()({
  entry: "",
  related: {
    connectOrCreate: { where: { id: "" }, create: { reason: "FORM" } },
  },
  partOfSpeech: { set: { definition: "", partOfSpeech: "" } },
});

const entryCreateInput3 = Prisma.validator<Prisma.EntryCreateInput>()({
  entry: "",
  related: {
    connectOrCreate: { where: { id: "" }, create: { reason: "FORM" } },
  },
  partOfSpeech: { set: { definition: "", partOfSpeech: "" } },
});

const include = Prisma.validator<Prisma.EntryInclude>()({ related: true });

prisma.entry.findUnique({ where: { entry: "" }, include });

const createUserAndPost = (
  name: string,
  email: string,
  postTitle: string,
  profileBio: string
) => {
  return Prisma.validator<Prisma.EntryCreateInput>()({
    entry: "",
    related: {
      connectOrCreate: { where: { id: "" }, create: { reason: "FORM" } },
    },
    partOfSpeech: { set: { definition: "", partOfSpeech: "" } },
  });
};
