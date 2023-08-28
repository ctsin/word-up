import { useEntry } from "@/hooks/useEntry";
import { TextInput, ActivityIndicator } from "react-native-paper";

export const Entry = () => {
  const { onChange, isInitialLoading } = useEntry();

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
