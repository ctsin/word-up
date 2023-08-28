import { useCreateContext } from "@/hooks/useCreateContext";
import { isNull } from "lodash";
import { ComponentProps } from "react";
import { Card, Chip, IconButton, TextInput } from "react-native-paper";

export const Definition = () => {
  const {
    values: {
      selected,
      partOfSpeech: { partOfSpeech, definition },
    },
  } = useCreateContext();

  if (isNull(selected)) return null;

  return (
    <Card>
      <Card.Title
        title={<Chip compact>{partOfSpeech}</Chip>}
        subtitle={definition}
        right={Right}
      />
      <Card.Content>
        <TextInput mode="outlined" value={""} onChangeText={(text) => {}} />
      </Card.Content>
    </Card>
  );
};

type RightProps = ComponentProps<
  Required<ComponentProps<typeof Card.Title>>["right"]
>;
const Right = (props: RightProps) => {
  return <IconButton {...props} icon="plus" onPress={() => {}} />;
};
