import { useEntryID } from "@/hooks/useEntryID";

export const useEntryQueryKey = () => {
  const entryID = useEntryID();
  return new URLSearchParams({ entryID }).toString();
};
