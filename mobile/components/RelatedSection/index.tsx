import { CreateRelatedModal } from "@/components/RelatedModal/CreateRelatedModal";
import { EditRelatedModal } from "@/components/RelatedModal/EditRelatedModal";
import { useRelatedContext } from "@/components/RelatedSection/RelatedProvider";
import { useDeleteRelated } from "@/hooks/useDeleteRelated";
import { useEntryID } from "@/hooks/useEntryID";
import { useReadRelated } from "@/hooks/useReadRelated";
import { Entry, Reason } from "@/prisma";
import { useMemo } from "react";
import { Button, Checkbox, Chip, IconButton, List } from "react-native-paper";

export const RelatedSection = () => {
  const { data: related } = useReadRelated();

  return (
    <>
      <ListTitle />

      {related.map(({ id, connectToTerm: { entry }, reason }) => (
        <ListItem key={id} id={id} title={entry} reason={reason} />
      ))}

      <CreateRelatedModal />
      <EditRelatedModal />
    </>
  );
};

const ListTitle = () => {
  const { selecting, selected, select, setCreationFilterModalVisible } =
    useRelatedContext();
  const entryID = useEntryID();
  const { mutateAsync: deleteEntry, isLoading } = useDeleteRelated(entryID);

  const onAdd = () => {
    setCreationFilterModalVisible(true);
  };

  const onRemove = async () => {
    try {
      await deleteEntry(selected);
      select([]);
    } catch (error) {
      console.error(`Run into error on "Delete" Action: ${error}`);
    }
  };

  if (selecting)
    return (
      <List.Item
        title="关联词汇"
        right={(props) => (
          <Button
            {...props}
            loading={isLoading}
            onPress={onRemove}
            mode="contained-tonal"
          >
            删除
          </Button>
        )}
      />
    );

  return (
    <List.Item
      title="关联词汇"
      right={(props) => (
        <IconButton
          onPress={onAdd}
          {...props}
          icon="plus"
          mode="contained-tonal"
        />
      )}
    />
  );
};

interface ListItemProps {
  id: Entry["id"];
  title: Entry["entry"];
  reason: Reason;
}
const ListItem = ({ id, title, reason }: ListItemProps) => {
  const { selecting, selected, select, setEditModalVisible, setEditingID } =
    useRelatedContext();

  const isSelected = useMemo(() => selected.includes(id), [id, selected]);

  const onSelect = () => select((prev) => [...prev, id]);
  const onUnselect = () => select((prev) => prev.filter((item) => item !== id));
  if (selecting)
    return (
      <List.Item
        title={title}
        right={(props) => (
          <Checkbox {...props} status={isSelected ? "checked" : "unchecked"} />
        )}
        onPress={isSelected ? onUnselect : onSelect}
        onLongPress={() => {
          select((prev) => [...prev, id]);
        }}
      />
    );

  return (
    <List.Item
      title={title}
      right={(props) => <Chip {...props}>{reason}</Chip>}
      onPress={() => {
        setEditingID(id);
        setEditModalVisible(true);
      }}
      onLongPress={() => {
        select((prev) => [...prev, id]);
      }}
    />
  );
};
