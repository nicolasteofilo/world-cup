import { Heading, VStack, Text } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input"
import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";

export function FindPool() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" onShare={() => {}} showBackButton /> 
      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="lg" mb={8} textAlign="center">
          Encontre um bolão através de{'\n'} seu código único
        </Heading>

        <Input placeholder="Qual o código do bolão?" />
        <Button title="BUSCAR BOLÃO" mt={2} />
      </VStack>
    </VStack>
  )
}
