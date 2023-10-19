import { API } from "@/const/API";
import { Entry } from "@/prisma";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isEmpty } from "lodash";

export const useEntryFilter = (filter: string) => {
  return useQuery({
    queryKey: [filter],
    queryFn: ({ signal }) =>
      axios
        .get<Entry[]>(`${API.SERVER}/entry/${filter}`, { signal })
        .then(({ data }) => data),
    initialData: [],
    enabled: !isEmpty(filter),
  });
};
