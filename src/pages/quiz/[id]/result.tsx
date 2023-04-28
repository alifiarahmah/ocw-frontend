import Layout from '@/components/layout';
import http from '@/lib/http';
import { getAvailableUserData } from '@/lib/token';
import { UserAnswer } from '@/types/user_answer';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Result() {
  const router = useRouter();
  const [score, setScore] = useState(0);

  useEffect(() => {
    // parse user answer as UserAnswer[] from router.query.userAnswers
    const userAnswers = JSON.parse(
      router.query.userAnswers as string
    ) as UserAnswer[];
    console.log(userAnswers);
    // POST
    http
      .post(`/quiz/${router.query.id}/finish`, {
        data: userAnswers,
        headers: {
          Authorization: `Bearer ${getAvailableUserData()}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setScore(res.data.data.score);
      });
  }, [router.query.id, router.query.userAnswers]);

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
            {score} / 100
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
