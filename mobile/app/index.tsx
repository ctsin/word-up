import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Formik, FormikConfig } from "formik";
import { Definition } from "@/components/Definition";
import { Phonetics } from "@/components/Phonetics";
import { Values } from "@/interface/createEntry";
import { Entry } from "@/components/Entry";
import { PartOfSpeech as PartOfSpeechProps } from "@/interface/dictionary";
import { PartOfSpeech } from "@/components/PartOfSpeech";
import { useCreate } from "@/services/entry";
import { useMemo } from "react";
import { isUndefined } from "lodash";
import { Successfully } from "@/components/Successfully";
import { AutoUpdateFields } from "@/components/AutoUpdateFields";

const initialValues: Values = {
  entry: "",
  phonetics: [],
  partOfSpeech: {} as PartOfSpeechProps,
  mandarin: [],
  dictionaries: undefined,
  selected: undefined,
};

export default function Create() {
  const { mutate, data } = useCreate();

  const created = useMemo(() => !isUndefined(data), [data]);

  const onSubmit: FormikConfig<Values>["onSubmit"] = async ({
    entry,
    mandarin,
    partOfSpeech,
    phonetics,
  }) => {
    try {
      mutate({ entry, mandarin, partOfSpeech, phonetics });
    } catch (error) {
      console.error(`Creation failed with error: ${error}`);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => {
        return (
          <ScrollView style={styles.container}>
            <AutoUpdateFields />

            <Entry />
            <Phonetics />
            <Definition />
            <PartOfSpeech />

            <Button onPress={() => handleSubmit()} mode="contained">
              提交
            </Button>

            {created && <Successfully />}
          </ScrollView>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
