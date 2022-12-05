import { Heading, VStack, Text } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input"
import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";

export function FindPool() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" onShare={() => {}} /> 
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily="heading" color="white" fontSize="lg" my={8} textAlign="center">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input placeholder="Qual nome do seu bolão?" />
        <Button title="CRIAR MEU BOLÃO" mt={2} />
        <Text color="gray.200" textAlign="center" mt={4}>
          Após criar seu bolão, você receberá um {'\n'} código único que poderá usar para convidar {'\n'} outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}
