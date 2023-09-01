import { useEntryInput } from "@/hooks/useEntryInput";
import { TextInput, ActivityIndicator } from "react-native-paper";

export const Entry = () => {
  const { onChange, isInitialLoading } = useEntryInput();

  return (
    <TextInput
      label="添加新词"
      mode="outlined"
      onChangeText={(value) => onChange(value)}
      right={
        <TextInput.Icon
          icon={() => <ActivityIndicator animating={isInitialLoading} />}
        />
      }
    />
  );
};
