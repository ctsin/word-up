import { useCreateContext } from "@/hooks/useCreateContext";
import { ValuesKey } from "@/interface/createEntry";
import { isUndefined } from "lodash";
import { Fragment } from "react";
import { List, Divider, Chip } from "react-native-paper";

export const PartOfSpeech = () => {
  const {
    values: { dictionaries, selected },
    setFieldValue,
  } = useCreateContext();

  if (isUndefined(dictionaries)) return null;

  const onSelected =
    (dictionaryIndex: number, meaningIndex: number, definitionIndex: number) =>
    () => {
      const selectedKey: ValuesKey = "selected";
      setFieldValue(selectedKey, [
        dictionaryIndex,
        meaningIndex,
        definitionIndex,
      ]);
    };

  return (
    <List.Section>
      {dictionaries.map(({ meanings }, dictionaryIndex) => {
        return (
          <Fragment key={dictionaryIndex}>
            {meanings.map(({ partOfSpeech, definitions }, meaningIndex) => {
              return (
                <Fragment key={meaningIndex}>
                  {!!meaningIndex && <Divider />}
                  <List.Item title={<Chip compact>{partOfSpeech}</Chip>} />
                  {definitions.map(({ definition }, definitionIndex) => {
                    const isCurrent = isUndefined(selected)
                      ? false
                      : [
                          dictionaryIndex,
                          meaningIndex,
                          definitionIndex,
                        ].join() === selected?.join();
                    return (
                      <Fragment key={definitionIndex}>
                        <List.Item
                          title={definition}
                          right={() =>
                            isCurrent && <List.Icon icon={"check"} />
                          }
                          onPress={onSelected(
                            dictionaryIndex,
                            meaningIndex,
                            definitionIndex
                          )}
                        />
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </List.Section>
  );
};
