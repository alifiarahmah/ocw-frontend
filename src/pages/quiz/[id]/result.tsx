import Layout from '@/components/layout';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Result() {
  const router = useRouter();
  return (
    <Layout>
      <Flex w="100%" h="70vh" justifyContent="center" alignItems="center">
        <Box
          bg="white"
          borderRadius="lg"
          p={10}
          textAlign="center"
          width={{ base: '100%', lg: '50%' }}
        >
          <Text fontSize="2xl">Kuis Selesai</Text>
          <Text mt={10}>Nilai:</Text>
          <Text mx={10} fontSize="3xl" fontFamily="Merriweather">
            29 / 100
          </Text>
          <Stack
            mt={10}
            justifyContent="space-between"
            direction={{ base: 'column', lg: 'row' }}
          >
            <Link href={router.asPath + '/../pembahasan'}>
              <Button bg="#4F4F4F" color="white">
                Cek Pembahasan
              </Button>
            </Link>
            <Link href={`/`}>
              <Button bg="biru.600" color="white">
                Kembali ke Course
              </Button>
            </Link>
          </Stack>
        </Box>
      </Flex>
    </Layout>
  );
}

export default Result;
