import { Phonetic } from "@/components/Phonetic";
import { isNull } from "lodash";
import { View } from "react-native";
import { useCreateContext } from "@/hooks/useCreateContext";

export const Phonetics = () => {
  const {
    values: { selected, phonetics },
  } = useCreateContext();

  if (isNull(selected)) return null;

  return (
    <View style={{ flexDirection: "row" }}>
      {phonetics.map((phonetic, index) => (
        <Phonetic key={index} {...phonetic} />
      ))}
    </View>
  );
};
