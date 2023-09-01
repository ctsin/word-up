import { Phonetic } from "@/components/Phonetic";
import { isEmpty } from "lodash";
import { View } from "react-native";
import { IPhonetics } from "@/interface/dictionary";

type PhoneticsProps = {
  phonetics: IPhonetics;
};

export const Phonetics = ({ phonetics }: PhoneticsProps) => {
  if (isEmpty(phonetics)) return null;

  return (
    <View style={{ flexDirection: "row" }}>
      {phonetics.map((phonetic, index) => (
        <Phonetic key={index} {...phonetic} />
      ))}
    </View>
  );
};
