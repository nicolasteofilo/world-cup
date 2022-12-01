import * as NavigationBar from 'expo-navigation-bar';

import { NativeBaseProvider, StatusBar } from "native-base";
import { THEME } from "./src/styles/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Loading } from "./src/components/Loading";
import { SignIn } from "./src/screens/SignIn";

export default function App() {
  NavigationBar.setBackgroundColorAsync("#202024");
  const [isLoadingFonts] = useFonts({
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {isLoadingFonts ? <Loading /> : <SignIn />}
    </NativeBaseProvider>
  );
}
