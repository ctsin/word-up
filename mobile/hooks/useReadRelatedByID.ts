import { API } from "@/const/API";
import { QUERY_KEYS } from "@/const/queryKey";
import { Entry, ReadRelatedTerm } from "@/prisma";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isEmpty } from "lodash";

export const useReadRelatedByID = (relatedID: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RELATED_TERM, relatedID],
    queryFn: () =>
      axios
        .get<ReadRelatedTerm & { connectToTerm: Entry }>(
          `${API.SERVER}/related/with/${relatedID}`
        )
        .then(({ data }) => data),
    enabled: !isEmpty(relatedID),
  });
};
