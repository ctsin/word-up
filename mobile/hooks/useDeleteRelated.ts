import { API } from "@/const/API";
import { QUERY_KEYS } from "@/const/queryKey";
import { Entry } from "@/interface/createEntry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { isUndefined } from "lodash";

type EntryID = Entry["id"];
export const useDeleteRelated = (entryID: EntryID | undefined) => {
  const queryClient = useQueryClient();

  if (isUndefined(entryID)) throw new Error("Entry ID is undefined");

  return useMutation({
    mutationFn: async (IDList: EntryID | EntryID[]) => {
      const { data } = await axios.delete<Entry>(
        `${API.SERVER}/related/${entryID}`,
        {
          data: Array.isArray(IDList) ? IDList : [IDList],
        }
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
