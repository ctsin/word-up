export interface Dictionary {
  word: string;
  phonetics: Phonetics;
  meanings: Meanings;
  license: License;
  sourceUrls: string[];
}

export type Dictionaries = Dictionary[];

export interface License {
  name: string;
  url: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

export interface PartOfSpeech {
  partOfSpeech: Meaning["partOfSpeech"];
  definition: Definition["definition"];
}

export type Meanings = Meaning[];

export interface Definition {
  definition: string;
  synonyms: any[];
  antonyms: any[];
  example?: string;
}

export type definitions = Definition[];

export interface Phonetic {
  audio: string;
  sourceUrl?: string;
  license?: License;
  text?: string;
}

export type Phonetics = Phonetic[];
