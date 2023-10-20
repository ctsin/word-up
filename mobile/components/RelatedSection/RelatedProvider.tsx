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

interface RelatedContextProps {
  selecting: boolean;
  selected: string[];
  select: Dispatch<SetStateAction<string[]>>;
  creationModalVisible: boolean;
  setCreationModalVisible: Dispatch<SetStateAction<boolean>>;
  creationFilterModalVisible: boolean;
  setCreationFilterModalVisible: Dispatch<SetStateAction<boolean>>;
  editModalVisible: boolean;
  setEditModalVisible: Dispatch<SetStateAction<boolean>>;
  editFilterModalVisible: boolean;
  setEditFilterModalVisible: Dispatch<SetStateAction<boolean>>;
  editingID: string;
  setEditingID: Dispatch<SetStateAction<string>>;
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
  const [creationFilterModalVisible, setCreationFilterModalVisible] =
    useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFilterModalVisible, setEditFilterModalVisible] = useState(false);
  const [editingID, setEditingID] =
    useState<RelatedContextProps["editingID"]>("");
  const selecting = useMemo(() => !isEmpty(selected), [selected]);

  return (
    <RelatedContext.Provider
      value={{
        selected,
        select,
        selecting,
        creationModalVisible,
        setCreationModalVisible,
        creationFilterModalVisible,
        setCreationFilterModalVisible,
        editModalVisible,
        setEditModalVisible,
        editFilterModalVisible,
        setEditFilterModalVisible,
        editingID,
        setEditingID,
      }}
    >
      {children}
    </RelatedContext.Provider>
  );
};
