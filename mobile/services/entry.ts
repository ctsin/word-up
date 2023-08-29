import { API } from "@/const/API";
import { EntryValues } from "@/interface/createEntry";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreate = () =>
  useMutation({
    mutationFn: (entry: EntryValues) =>
      axios.post<EntryValues>(`${API.SERVER}/entry`, entry),
  });
