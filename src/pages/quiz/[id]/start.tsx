import Layout from '@/components/layout';
import http from '@/lib/http';
import { getAvailableUserData } from '@/lib/token';
import { Problem } from '@/types/problem';
import { UserAnswer } from '@/types/user_answer';
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
  const [quizName, setQuizName] = useState('');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
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

  // if minutes is 0, then the quiz is over
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      alert('Waktu habis!');
      router.push(router.asPath + '/../result');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds]);

  const hours = Math.floor(minutes / 60);

  useEffect(() => {
    http
      .post(`/quiz/${router.query.id}/take`, {
        Authorization: `Bearer ${getAvailableUserData()}`,
      })
      .then((res) => {
        setQuizName(res.data.data.name);
        setProblems(res.data.data.problems);
      });
  });

  return (
    <>
      <Layout p={0} title={`${quizName}`}>
        <Stack mb={10} px={{ base: 5, md: 20 }} py={{ base: 5, md: 10 }}>
          <Heading my={5}>{quizName}</Heading>
          <Stack gap={3} mt={10}>
            {problems.map((problem, index) => (
              <Box key="item" bg="white" borderRadius="lg" p={5}>
                <Text fontWeight="bold">Nomor {index + 1}</Text>
                <Text my={3}>{problem.question}</Text>
                <form>
                  <RadioGroup>
                    <Stack gap={2}>
                      {problem.answers.map((answer, index) => (
                        <Radio key={answer.id} value={answer.id}>
                          {answer.answer}
                        </Radio>
                      ))}
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
