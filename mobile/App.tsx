import { StatusBar } from "expo-status-bar";

import { NativeBaseProvider, Center, Text } from "native-base";
import { THEME } from './src/styles/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <Center
        flex={1}
        bgColor="gray.800"
      >
        <Text color="gray.900">Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}
