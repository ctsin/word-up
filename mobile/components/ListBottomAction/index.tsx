import { Button } from "react-native-paper";
import { BottomSheetView, useBottomSheet } from "@gorhom/bottom-sheet";
import { Entry } from "@/prisma";
import { useDeleteEntry } from "@/hooks/useDeleteEntry";
import { StyleSheet } from "react-native";
import { STYLES } from "@/const/style";
import { useRouter } from "expo-router";

interface ListBottomActionProps {
  entryID: Entry["id"];
}

export const ListBottomAction = ({ entryID }: ListBottomActionProps) => {
  const route = useRouter();
  const { close } = useBottomSheet();
  const onSuccess = () => {
    close();
  };
  const { mutate: onDelete, isLoading } = useDeleteEntry({
    onSuccess,
  });

  return (
    <BottomSheetView style={styles.container}>
      <Button
        onPress={() => {
          close();
          route.push(`/edit/${entryID}`);
        }}
        mode="contained"
      >
        编辑
      </Button>
      <Button
        loading={isLoading}
        onPress={() => {
          onDelete(entryID);
        }}
        mode="contained"
      >
        删除
      </Button>
      <Button
        onPress={() => {
          close();
        }}
        mode="outlined"
      >
        取消
      </Button>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: STYLES.spacing,
    padding: STYLES.spacing,
  },
});
