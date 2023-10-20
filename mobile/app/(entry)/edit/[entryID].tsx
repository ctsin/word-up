import { Phonetics } from "@/components/Phonetics";
import { useEntry } from "@/hooks/useEntry";
import { useEntryID } from "@/hooks/useEntryID";
import { Stack } from "expo-router";
import { isUndefined } from "lodash";
import { Divider, List, Text } from "react-native-paper";
import { RelatedSection } from "@/components/RelatedSection";
import { RelatedProvider } from "@/components/RelatedSection/RelatedProvider";

export default function Edit() {
  const entryID = useEntryID();

  const { data: entryItem } = useEntry();

  if (isUndefined(entryID)) return null;
  if (isUndefined(entryItem)) return null;

  const {
    entry,
    phonetics,
    partOfSpeech: { partOfSpeech, definition },
  } = entryItem;

  return (
    <>
      <Stack.Screen
        options={{
          title: "详情",
          headerTitle: (props) => <Text {...props}>编辑</Text>,
        }}
      />

      <List.Item
        title={(props) => (
          <Text {...props} variant="displayLarge">
            {entry}
          </Text>
        )}
      />
      <List.Item title={partOfSpeech} />
      <Phonetics phonetics={phonetics} />
      <List.Item title={definition} />
      <Divider />

      <RelatedProvider>
        <RelatedSection />
      </RelatedProvider>
    </>
  );
}
