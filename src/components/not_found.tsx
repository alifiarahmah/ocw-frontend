import { Text, Center, Stack, Image } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Center>
      <Stack direction={'column'}>
        <Image src="@/asset/error.png" boxSize={100} align={'center'}/>
        <Text fontWeight={700} fontSize={48} align={'center'}>404</Text>
        <Text fontWeight={600} fontSize={24} align={'center'}>Page Not Found</Text>
      </Stack>
    </Center>
  );
}

export default NotFound;