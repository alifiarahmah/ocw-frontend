import Layout from '@/components/layout';
import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdTimer } from 'react-icons/md';

function Quiz() {
  // create countdown from 100 minutes
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const hours = Math.floor(minutes / 60);

  return (
    <>
      <Layout p={0}>
        <Stack mb={10} px={{ base: 5, md: 20 }} py={{ base: 5, md: 10 }}>
          <Heading my={5}>Latihan Soal Clustering 1</Heading>
          <Stack gap={3} mt={10}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <Box key="item" bg="white" borderRadius="lg" p={5}>
                <Text fontWeight="bold">Nomor {item}</Text>
                <Text my={3}>Ini adalah soalnya...</Text>
                <form>
                  <RadioGroup>
                    <Stack gap={2}>
                      <Radio value="a">Jawaban A</Radio>
                      <Radio value="b">Jawaban B</Radio>
                      <Radio value="c">Jawaban C</Radio>
                      <Radio value="d">Jawaban D</Radio>
                    </Stack>
                  </RadioGroup>
                </form>
              </Box>
            ))}
          </Stack>
          <Flex justifyContent="flex-end" mt={20}>
            <Button
              bg="biru.600"
              color="white"
              onClick={() => router.push(router.asPath + '/../result')}
            >
              Selesai
            </Button>
          </Flex>
        </Stack>
      </Layout>
      <Flex
        h={10}
        bg="black"
        color="white"
        position="fixed"
        bottom="0px"
        w="100%"
        alignItems="center"
        pl={5}
        justifyContent={{ base: 'center', md: 'flex-start' }}
      >
        <MdTimer />
        <Text ml={1}>
          {hours}:{minutes < 10 ? 0 : ''}
          {minutes}:{seconds < 10 ? 0 : ''}
          {seconds}
        </Text>
      </Flex>
    </>
  );
}

export default Quiz;
