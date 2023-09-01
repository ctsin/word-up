import { API } from "@/const/API";
import { QUERY_KEYS } from "@/const/queryKey";
import { EntryValues } from "@/interface/createEntry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (entry: EntryValues) =>
      axios.post<EntryValues>(`${API.SERVER}/entry`, entry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ENTRIES] });
    },
  });
};
