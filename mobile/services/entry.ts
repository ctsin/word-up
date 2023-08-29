import { EntryValues } from "@/interface/createEntry";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreate = () =>
  useMutation({
    mutationFn: (entry: EntryValues) =>
      axios.post<{ foo: string }>("http://localhost:3000/api/hello", entry),
  });
