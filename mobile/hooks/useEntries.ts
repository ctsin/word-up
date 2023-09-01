import { API } from "@/const/API";
import { QUERY_KEYS } from "@/const/queryKey";
import { Entries } from "@/interface/entry";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useEntries = () =>
  useQuery({
    queryKey: [QUERY_KEYS.ENTRIES],
    queryFn: () =>
      axios.get<Entries>(`${API.SERVER}/entries`).then(({ data }) => data),
  });
