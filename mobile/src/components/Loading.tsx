import { Center, Spinner, Heading } from "native-base";

export function Loading() {
  return (
    <Center flex={1} bg="gray.900">
      <Heading color="yellow.500" fontSize="xl">
        Carregando...
      </Heading>
    </Center>
  );
}
