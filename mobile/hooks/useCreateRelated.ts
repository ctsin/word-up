import { API } from "@/const/API";
import { QUERY_KEYS } from "@/const/queryKey";
import { Entry } from "@/interface/createEntry";
import { EntryWithReason } from "@/interface/entry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { isUndefined } from "lodash";

export const useCreateRelated = (entryID: Entry["id"] | undefined) => {
  const queryClient = useQueryClient();

  if (isUndefined(entryID)) throw new Error("Entry ID is undefined");

  return useMutation({
    mutationFn: async (related: Pick<EntryWithReason, "id" | "reason">) => {
      const searchParams = new URLSearchParams({ entryID }).toString();
      const { data } = await axios.post<Entry>(
        `${API.SERVER}/related?${searchParams}`,
        related
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RELATED_TERMS, entryID],
      });
    },
  });
};
