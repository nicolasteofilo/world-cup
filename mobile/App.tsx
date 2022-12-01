import { StatusBar } from "expo-status-bar";

import { NativeBaseProvider, Center, Text } from "native-base";
import { THEME } from "./src/styles/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Loading } from "./src/components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? (
        <Loading />
      ) : (
        <Center flex={1} bgColor="gray.800">
          <Text color="gray.100">
            Open up App.js to start working on your app!
          </Text>
          <StatusBar style="auto" />
        </Center>
      )}
    </NativeBaseProvider>
  );
}
