import { useEntries } from "@/hooks/useEntries";
import { isUndefined } from "lodash";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useRef, useState } from "react";
import { Entry } from "@/prisma";
import { Button, List, Text } from "react-native-paper";
import { Stack, router } from "expo-router";
import { Phonetics } from "@/components/Phonetics";
import { ListBottomAction } from "@/components/ListBottomAction";
import BottomSheet from "@gorhom/bottom-sheet";

export default function Entries() {
  const [targetID, setTargetID] = useState("");
  const bottomRef = useRef<BottomSheet>(null);

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
      item: Entry;
    }) => (
      <List.Item
        title={entry}
        description={(props) => <Phonetics {...props} phonetics={phonetics} />}
        right={(props) => <Text {...props}>{partOfSpeech}</Text>}
        onLongPress={() => {
          setTargetID(id);

          bottomRef.current?.expand();
        }}
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
      <BottomSheet index={-1} snapPoints={["30%"]} ref={bottomRef}>
        <ListBottomAction entryID={targetID} />
      </BottomSheet>
    </>
  );
}
