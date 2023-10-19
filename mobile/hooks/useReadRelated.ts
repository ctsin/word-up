import { API } from "@/const/API";
import { QUERY_KEYS } from "@/const/queryKey";
import { useEntryID } from "@/hooks/useEntryID";
import { Entry, ReadRelatedTerm } from "@/prisma";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useReadRelated = () => {
  const entryID = useEntryID();

  return useQuery({
    queryKey: [QUERY_KEYS.RELATED_TERMS, entryID],
    queryFn: () =>
      axios
        .get<(ReadRelatedTerm & { connectToTerm: Entry })[]>(
          `${API.SERVER}/related/${entryID}`
        )
        .then(({ data }) => data),
    initialData: [],
  });
};
