import { useEntries } from "@/hooks/useEntries";
import { isUndefined } from "lodash";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { EntryWithRelated } from "@/prisma";
import { Button, List, Text } from "react-native-paper";
import { Stack, router } from "expo-router";
import { Phonetics } from "@/components/Phonetics";

export default function Entries() {
  const { data: entries } = useEntries();

  const renderItem = useCallback(
    ({
      item: {
        id,
        phonetics,
        entry,
        partOfSpeech: { partOfSpeech },
      },
    }: {
      item: EntryWithRelated;
    }) => (
      <List.Item
        title={entry}
        description={(props) => <Phonetics {...props} phonetics={phonetics} />}
        right={(props) => <Text {...props}>{partOfSpeech}</Text>}
        onPress={() => {
          router.push(`/detail/${id}`);
        }}
      />
    ),
    []
  );

  if (isUndefined(entries)) return null;

  return (
    <>
      <Stack.Screen
        options={{
          title: "列表",
          headerTitle: (props) => <Text {...props}>开始</Text>,
          headerRight: () => (
            <Button
              onPress={() => {
                router.push("/create");
              }}
              icon="plus"
            >
              新建
            </Button>
          ),
        }}
      />
      <FlashList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={64}
      />
    </>
  );
}
