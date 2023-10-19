import { isEmpty } from "lodash";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface RelatedContextProps<S = string> {
  selecting: boolean;
  selected: S[];
  select: Dispatch<SetStateAction<S[]>>;
  creationModalVisible: boolean;
  setCreationModalVisible: Dispatch<SetStateAction<boolean>>;
  filterModalVisible: boolean;
  setFilterModalVisible: Dispatch<SetStateAction<boolean>>;
}
const RelatedContext = createContext<RelatedContextProps>(null!);

export const useRelatedContext = () => {
  const context = useContext(RelatedContext);

  if (!context) throw new Error("A context API is required!");

  return context;
};

export const RelatedProvider = ({ children }: { children: ReactNode }) => {
  const [selected, select] = useState<string[]>([]);
  const [creationModalVisible, setCreationModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const selecting = useMemo(() => !isEmpty(selected), [selected]);

  return (
    <RelatedContext.Provider
      value={{
        selected,
        select,
        selecting,
        creationModalVisible,
        setCreationModalVisible,
        filterModalVisible,
        setFilterModalVisible,
      }}
    >
      {children}
    </RelatedContext.Provider>
  );
};
