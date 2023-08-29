import { useCreateContext } from "@/hooks/useCreateContext";
import { ValuesKey } from "@/interface/createEntry";
import { Meaning, Definition, Dictionary } from "@/interface/dictionary";
import { get, isUndefined } from "lodash";
import { useEffect } from "react";

export const AutoUpdateFields = () => {
  const { values, setFieldValue } = useCreateContext();
  const { dictionaries, selected } = values;

  useEffect(() => {
    if (isUndefined(dictionaries)) return;
    if (isUndefined(selected)) return;

    const phoneticsKey: ValuesKey = "phonetics";
    const partOfSpeechKey: ValuesKey = "partOfSpeech";

    const [dictionaryIndex, meaningIndex, definitionIndex] = selected;
    const { phonetics, meanings } = get(
      dictionaries,
      dictionaryIndex
    )! as Dictionary;

    const meaning = get(meanings, meaningIndex)! as Meaning;

    const { partOfSpeech, definitions } = meaning;
    const { definition } = get(definitions, definitionIndex)! as Definition;

    setFieldValue(phoneticsKey, phonetics);
    setFieldValue(partOfSpeechKey, { partOfSpeech, definition });
  }, [dictionaries, selected, setFieldValue]);

  return null;
};
