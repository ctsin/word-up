import { useLocalSearchParams } from "expo-router";

export const useEntryID = () => {
  const defaultEntryID = "";

  const { entryID = defaultEntryID } = useLocalSearchParams<{
    entryID: string;
  }>();

  return entryID;
};
