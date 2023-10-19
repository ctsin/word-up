import { useCreateRelated } from "@/hooks/useCreateRelated";
import { useEntryID } from "@/hooks/useEntryID";
import { useEntryFilter } from "@/hooks/useEntryFilter";
import { EntryWithReason } from "@/interface/entry";
import { Formik, useFormikContext } from "formik";
import { isEmpty, noop } from "lodash";
import { useMemo, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import {
  Button,
  IconButton,
  List,
  Searchbar,
  SegmentedButtons,
  Text,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRelatedContext } from "@/components/RelatedSection/RelatedProvider";
import { Phonetics } from "@/components/Phonetics";

const CreationModal = () => {
  const { top } = useSafeAreaInsets();
  const entryID = useEntryID();

  const { mutateAsync: createRelated } = useCreateRelated(entryID);

  const { values, resetForm } = useFormikContext<EntryWithReason>();
  const {
    creationModalVisible,
    setCreationModalVisible,
    setFilterModalVisible,
  } = useRelatedContext();

  const { id, entry, phonetics, partOfSpeech, mandarin, reason } = values;

  const disabled = useMemo(() => isEmpty(id) || isEmpty(reason), [id, reason]);

  const onClose = () => {
    resetForm();
    setCreationModalVisible(false);
  };

  const onDone = async () => {
    try {
      await createRelated({ id, reason });
      onClose();
    } catch (error) {
      console.error("Create related item failed.");
    }
  };

  return (
    <Modal transparent visible={creationModalVisible} animationType="slide">
      <View style={[styles.model, { paddingTop: top }]}>
        <List.Item
          title="选择关联词汇"
          right={(props) => (
            <Button {...props} onPress={onClose}>
              取消
            </Button>
          )}
        />

        <Button
          mode="contained-tonal"
          icon="text-search"
          style={styles.margin16}
          contentStyle={{ justifyContent: "flex-start" }}
          onPress={() => {
            setFilterModalVisible(true);
          }}
        >
          搜索
        </Button>

        <View style={styles.margin16}>
          <Text variant="displayLarge">{entry}</Text>
          <Phonetics phonetics={phonetics} />
          <Text variant="bodyLarge">{partOfSpeech.definition}</Text>
          {mandarin.map((item) => (
            <Text variant="bodyLarge">{item}</Text>
          ))}
        </View>

        {!isEmpty(id) && (
          <View style={[styles.margin16, { gap: 16 * 2 }]}>
            <ReasonButtons />

            <Button disabled={disabled} onPress={onDone} mode="contained">
              完成
            </Button>
          </View>
        )}
      </View>
      <FilterModal />
    </Modal>
  );
};

const FilterModal = () => {
  const { top } = useSafeAreaInsets();

  const { values, setValues } = useFormikContext<EntryWithReason>();
  const { filterModalVisible, setFilterModalVisible } = useRelatedContext();

  const [filter, setFilter] = useState("");
  const { data: filterResponse, isInitialLoading } = useEntryFilter(filter);

  const onSelect = (entry: Omit<EntryWithReason, "reason">) => {
    setValues({
      ...values,
      ...entry,
    });

    setFilterModalVisible(false);
  };

  return (
    <Modal
      transparent
      visible={filterModalVisible}
      animationType="slide"
      onDismiss={() => {
        setFilter("");
      }}
    >
      <View style={[styles.model, { paddingTop: top }]}>
        <List.Item
          title="搜索关联词汇"
          right={(props) => (
            <IconButton
              icon="close"
              {...props}
              onPress={() => {
                setFilterModalVisible(false);
              }}
            />
          )}
        />

        <Searchbar
          style={styles.margin16}
          placeholder="搜索"
          onChangeText={(query) => {
            setFilter(query);
          }}
          value={filter}
          icon="filter-variant"
          loading={isInitialLoading}
        />

        {filterResponse.map((entryItem) => {
          const {
            partOfSpeech: { definition },
            entry,
            id,
          } = entryItem;

          return (
            <List.Item
              title={entry}
              description={definition}
              key={id}
              onPress={() => onSelect(entryItem)}
            />
          );
        })}
      </View>
    </Modal>
  );
};

const ReasonButtons = () => {
  const {
    values: { reason },
    setFieldValue,
  } = useFormikContext<EntryWithReason>();

  return (
    <SegmentedButtons
      value={reason}
      onValueChange={(value) => {
        setFieldValue("reason", value);
      }}
      buttons={[
        {
          value: "PHONETIC",
          label: "音",
        },
        {
          value: "FORM",
          label: "形",
        },
        { value: "MEANING", label: "意" },
      ]}
    />
  );
};

export const AddRelatedModal = () => {
  const initialValues: EntryWithReason = {
    id: "",
    entry: "",
    phonetics: [],
    partOfSpeech: { definition: "", partOfSpeech: "" },
    mandarin: [],
    reason: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={noop}>
      <CreationModal />
    </Formik>
  );
};

const styles = StyleSheet.create({
  model: {
    flex: 1,
    backgroundColor: "white",
  },
  margin16: {
    margin: 16,
  },
});
