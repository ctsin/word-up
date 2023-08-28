import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Formik, FormikConfig } from "formik";
import { Definition } from "@/components/Definition";
import { Phonetics } from "@/components/Phonetics";
import { Values } from "@/interface/createEntry";
import { Entry } from "@/components/Entry";
import { PartOfSpeech as PartOfSpeechProps } from "@/interface/dictionary";
import { PartOfSpeech } from "@/components/PartOfSpeech";
import { AutoUpdateFields } from "@/app/AutoUpdateFields";
import { createEntryService } from "@/services/entry";

const initialValues: Values = {
  entry: "",
  phonetics: [],
  partOfSpeech: {} as PartOfSpeechProps,
  mandarin: [],
  dictionaries: null,
  selected: null,
};

export default function Create() {
  const onSubmit: FormikConfig<Values>["onSubmit"] = async ({
    entry,
    mandarin,
    partOfSpeech,
    phonetics,
  }) => {
    try {
      await createEntryService({ entry, mandarin, partOfSpeech, phonetics });
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
