import { API } from "@/const/API";
import { useEntryQueryKey } from "@/hooks/useEntryQueryKey";
import { EntryWithRelated } from "@/prisma";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useEntry = () => {
  const searchParams = useEntryQueryKey();
  return useQuery({
    queryKey: [searchParams],
    queryFn: () =>
      axios
        .get<EntryWithRelated>(`${API.SERVER}/entry?${searchParams}`)
        .then(({ data }) => data),
  });
};
