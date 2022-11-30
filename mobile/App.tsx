import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Center, Text } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Center
        flex={1}
        bgColor="fuchsia.400"
      >
        <Text color="gray.900">Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}
