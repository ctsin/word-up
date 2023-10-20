import { API } from "@/const/API";
import { QUERY_KEYS } from "@/const/queryKey";
import { useEntryID } from "@/hooks/useEntryID";
import { UpdateRelatedByID } from "@/interface/related";
import { Entry, ReadRelatedTerm } from "@/prisma";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateRelatedByID = (relatedID: string) => {
  const queryClient = useQueryClient();
  const entryID = useEntryID();

  return useMutation({
    async mutationFn(field: UpdateRelatedByID) {
      return axios
        .patch<ReadRelatedTerm & { connectToTerm: Entry }>(
          `${API.SERVER}/related/with/${relatedID}`,
          field
        )
        .then(({ data }) => data);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RELATED_TERM, relatedID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RELATED_TERMS, entryID],
      });
    },
  });
};
