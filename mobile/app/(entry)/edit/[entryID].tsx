import { Phonetics } from "@/components/Phonetics";
import { useEntry } from "@/hooks/useEntry";
import { Entry } from "@/prisma";
import { Stack, useLocalSearchParams } from "expo-router";
import { isNull, isUndefined } from "lodash";
import { Button, Surface, Text } from "react-native-paper";

export default function Edit() {
  const { entryID } = useLocalSearchParams<{ entryID: Entry["id"] }>();

  const entryItem = useEntry(entryID);

  if (isNull(entryItem)) return null;
  if (isUndefined(entryID)) return null;

  const {
    entry,
    phonetics,
    partOfSpeech: { partOfSpeech, definition },
  } = entryItem;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text {...props}>编辑</Text>,
        }}
      />
      <Surface mode="flat" elevation={0}>
        <Text variant="headlineLarge">编辑：{entry}</Text>
        <Text variant="labelSmall">{partOfSpeech}</Text>
        <Phonetics phonetics={phonetics} />
        <Text variant="labelSmall">{definition}</Text>
        <Button mode="contained">确认</Button>
      </Surface>
    </>
  );
}
