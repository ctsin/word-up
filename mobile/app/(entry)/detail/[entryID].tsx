import { Phonetics } from "@/components/Phonetics";
import { useEntry } from "@/hooks/useEntry";
import { Entry } from "@/prisma";
import { Stack, useLocalSearchParams } from "expo-router";
import { isNull, isUndefined } from "lodash";
import { Button, Surface, Text } from "react-native-paper";

export default function Detail() {
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
          headerTitle: (props) => <Text {...props}>详情</Text>,
          headerRight: () => (
            <Button icon="playlist-edit" onPress={() => null}>
              编辑
            </Button>
          ),
        }}
      />
      <Surface mode="flat" elevation={0}>
        <Text variant="headlineLarge">{entry}</Text>
        <Text variant="labelSmall">{partOfSpeech}</Text>
        <Phonetics phonetics={phonetics} />
        <Text variant="labelSmall">{definition}</Text>
      </Surface>
    </>
  );
}
