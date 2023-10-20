import { useEntryFilter } from "@/hooks/useEntryFilter";
import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  IconButton,
  List,
  Searchbar,
  SegmentedButtons,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRelatedContext } from "@/components/RelatedSection/RelatedProvider";
import { useReadRelatedByID } from "@/hooks/useReadRelatedByID";
import { isUndefined } from "lodash";
import { useUpdateRelatedByID } from "@/hooks/useUpdateRelatedByID";
import { Reason } from "@/prisma";

export const EditRelatedModal = () => {
  const { top } = useSafeAreaInsets();

  const {
    editModalVisible,
    setEditModalVisible,
    setEditFilterModalVisible,
    editingID,
    setEditingID,
  } = useRelatedContext();
  const { data: related, isLoading: isReadLoading } =
    useReadRelatedByID(editingID);

  const onClose = () => {
    setEditModalVisible(false);
    setEditingID("");
  };

  if (isUndefined(related)) {
    return (
      <Modal transparent visible={editModalVisible} animationType="slide">
        <View style={[styles.model, { paddingTop: top }]}>
          <List.Item
            title="编辑关联词汇"
            right={(props) =>
              isReadLoading ? (
                <ActivityIndicator {...props} />
              ) : (
                <IconButton icon="close" {...props} onPress={onClose} />
              )
            }
          />
        </View>

        <FilterModal />
      </Modal>
    );
  }

  const {
    connectToTerm: { entry },
  } = related;

  return (
    <Modal transparent visible={editModalVisible} animationType="slide">
      <View style={[styles.model, { paddingTop: top }]}>
        <List.Item
          title="编辑关联词汇"
          right={(props) => (
            <IconButton icon="close" {...props} onPress={onClose} />
          )}
        />

        <List.Item
          title={entry}
          right={(props) => <List.Icon {...props} icon="pencil" />}
          onPress={() => {
            setEditFilterModalVisible(true);
          }}
        />

        <ReasonButtons />
      </View>
      <FilterModal />
    </Modal>
  );
};

const FilterModal = () => {
  const { top } = useSafeAreaInsets();

  const { editFilterModalVisible, setEditFilterModalVisible, editingID } =
    useRelatedContext();

  const [filter, setFilter] = useState("");
  const { data: filterResponse, isInitialLoading } = useEntryFilter(filter);

  const { mutateAsync: updateRelated } = useUpdateRelatedByID(editingID);

  const onSelect = async (connectToTermID: string) => {
    try {
      await updateRelated({ entryID: connectToTermID });
      setEditFilterModalVisible(false);
    } catch (error) {
      console.error("Update related item failed.");
    }
  };

  return (
    <Modal
      transparent
      visible={editFilterModalVisible}
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
                setEditFilterModalVisible(false);
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
              onPress={() => onSelect(id)}
            />
          );
        })}
      </View>
    </Modal>
  );
};

const ReasonButtons = () => {
  const { editingID } = useRelatedContext();

  const { data: related } = useReadRelatedByID(editingID);
  const { mutate: updateRelated } = useUpdateRelatedByID(editingID);
  if (isUndefined(related)) return null;

  const { reason } = related;

  return (
    <SegmentedButtons
      value={reason}
      onValueChange={(value) => {
        updateRelated({ reason: value as Reason });
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
      style={{ margin: 16 }}
    />
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
