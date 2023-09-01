import { API } from "@/const/API";
import { QUERY_KEYS } from "@/const/queryKey";
import { Entry } from "@/prisma";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UseDeleteEntryParams {
  onSuccess?: () => void;
}

export const useDeleteEntry = ({ onSuccess }: UseDeleteEntryParams = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entryID: Entry["id"]) => {
      const searchParams = new URLSearchParams({ entryID }).toString();

      const { data } = await axios.delete(
        `${API.SERVER}/entry?${searchParams}`
      );
      return data;
    },
    onSuccess: () => {
      onSuccess?.();

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ENTRIES] });
    },
  });
};
