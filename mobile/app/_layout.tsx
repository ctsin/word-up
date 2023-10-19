import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <PaperProvider>
          <Stack />
          <StatusBar />
        </PaperProvider>
      </ApplicationProvider>
    </QueryClientProvider>
  );
}
