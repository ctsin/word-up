import { Entry } from "@/prisma";

export interface IDictionary {
  word: string;
  phonetics: IPhonetics;
  meanings: IMeanings;
  license: ILicense;
  sourceUrls: string[];
}

export type IDictionaries = IDictionary[];

export interface ILicense {
  name: string;
  url: string;
}

export interface IMeaning {
  partOfSpeech: string;
  definitions: IDefinitions;
  synonyms: string[];
  antonyms: string[];
}

export interface IPartOfSpeech {
  partOfSpeech: IMeaning["partOfSpeech"];
  definition: Definition["definition"];
}

export type IMeanings = IMeaning[];

export interface Definition {
  definition: string;
  synonyms: any[];
  antonyms: any[];
  example?: string;
}

export type IDefinitions = Definition[];

export type IPhonetic = Entry["phonetics"][number];

export type IPhonetics = IPhonetic[];
