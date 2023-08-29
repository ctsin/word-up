import { Snackbar } from "react-native-paper";
import { useState } from "react";

export const Successfully = () => {
  const [visible, setVisible] = useState(true);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: "Edit",
        onPress: () => {
          // Gonna edit new entry
        },
      }}
    >
      已创建新的词条
    </Snackbar>
  );
};
