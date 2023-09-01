import { useCreateContext } from "@/hooks/useCreateContext";
import { ValuesKey } from "@/interface/createEntry";
import { IDictionaries } from "@/interface/dictionary";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "const/API";
import { isEmpty, isNull } from "lodash";
import { useEffect } from "react";

export const useEntryInput = () => {
  const dictionaries: ValuesKey = "dictionaries";

  const {
    setFieldValue,
    setFieldError,
    handleChange,
    values: { entry },
  } = useCreateContext();

  const queryFn: QueryOptions<IDictionaries>["queryFn"] = ({ signal }) =>
    axios
      .get(`${API.DICTIONARY}/${entry}`, { signal })
      .then(({ data }) => data);

  const response = useQuery({
    queryKey: [entry],
    queryFn,
    enabled: !isEmpty(entry),
  });

  const { error, data } = response;

  useEffect(() => {
    isNull(error)
      ? setFieldValue(dictionaries, data)
      : setFieldError(dictionaries, error as any);
  }, [data, error, setFieldError, setFieldValue]);

  const onChange = handleChange("entry");

  return { ...response, onChange };
};
