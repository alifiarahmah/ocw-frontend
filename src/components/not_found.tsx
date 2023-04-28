import { Text, Center, Stack, Image } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Center>
      <Stack direction={'column'}>
        <Image src="/error.png" boxSize={100} alignSelf={'center'} alt='error.png'/>
        <Text fontWeight={700} fontSize={48} align={'center'}>Oh Tidak! :(</Text>
        <Text fontWeight={600} fontSize={24} align={'center'}>Halaman yang Anda cari tidak ditemukan</Text>
      </Stack>
    </Center>
  );
}

export default NotFound;