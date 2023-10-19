import { Phonetics } from "@/components/Phonetics";
import { useEntry } from "@/hooks/useEntry";
import { EntryWithRelated } from "@/prisma";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { isUndefined } from "lodash";
import { useState } from "react";
import { Button, IconButton, Menu, Surface, Text } from "react-native-paper";

export default function Detail() {
  const route = useRouter();
  const [visible, setVisible] = useState(false);
  const { entryID } = useLocalSearchParams<{
    entryID: EntryWithRelated["id"];
  }>();

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
          headerTitle: (props) => <Text {...props}>详情</Text>,
          headerRight: () => (
            <>
              <Button
                onPress={() => {
                  route.push(`/edit/${entryID}`);
                }}
              >
                编辑
              </Button>

              <Menu
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    onPress={() => setVisible(true)}
                  />
                }
                visible={visible}
                onDismiss={() => setVisible(false)}
              >
                <Menu.Item
                  title="删除"
                  leadingIcon="delete"
                  onPress={() => {}}
                />
              </Menu>
            </>
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
