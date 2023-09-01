import { useCreateContext } from "@/hooks/useCreateContext";
import { ValuesKey } from "@/interface/createEntry";
import { IMeaning, Definition, IDictionary } from "@/interface/dictionary";
import { get, isUndefined } from "lodash";
import { useEffect } from "react";
import { isUK, isUS } from "utils/isRegion";

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
    )! as IDictionary;

    const meaning = get(meanings, meaningIndex)! as IMeaning;

    const { partOfSpeech, definitions } = meaning;
    const { definition } = get(definitions, definitionIndex)! as Definition;

    const phoneticsFiltered = phonetics.filter(
      ({ audio }) => isUK(audio) || isUS(audio)
    );
    setFieldValue(phoneticsKey, phoneticsFiltered);
    setFieldValue(partOfSpeechKey, { partOfSpeech, definition });
  }, [dictionaries, selected, setFieldValue]);

  return null;
};
