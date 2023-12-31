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
  const [isDoneLoading, setIsDoneLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isDoneLoading) {
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
    }
  }, [isDoneLoading, minutes, seconds]);

  // if minutes is 0, then the quiz is over
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      alert('Waktu habis!');
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds]);

  const hours = Math.floor(minutes / 60);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (problems.length == 0) {
      http
        .post(`/quiz/${router.query.id}/take`, {
          Authorization: `Bearer ${getAvailableUserData()}`,
        })
        .then((res) => {
          setQuizName(res.data.data.name);
          setProblems(res.data.data.problems);
        })
        .catch((err) => {
          console.log(err.response.data);
        })
        .finally(() => setIsDoneLoading(true));
    }
  }, [problems.length, router.isReady, router.query.id]);

  const handleChangeAnswer = (problemId: string, answerId: string) => {
    // if same problemId already exists, then replace it
    if (userAnswers.some((userAnswer) => userAnswer.problem_id === problemId)) {
      setUserAnswers(
        userAnswers.map((userAnswer) =>
          userAnswer.problem_id === problemId
            ? { ...userAnswer, answer_id: answerId }
            : userAnswer
        )
      );
    } else {
      setUserAnswers([
        ...userAnswers,
        {
          problem_id: problemId,
          answer_id: answerId,
        },
      ]);
    }
  };

  const handleSubmit = () => {
    router.push({
      pathname: router.asPath + '/../result',
      query: { userAnswers: JSON.stringify(userAnswers) },
    });
  };

  return (
    <>
      <Layout p={0} title={`${quizName}`}>
        <Stack mb={10} px={{ base: 5, md: 20 }} py={{ base: 5, md: 10 }}>
          <Heading my={5}>{quizName}</Heading>
          <Stack gap={3} mt={10}>
            {isDoneLoading ? (
              problems.map((problem, index) => (
                <Box key={problem.id} bg="white" borderRadius="lg" p={5}>
                  <Text fontWeight="bold">Nomor {index + 1}</Text>
                  <Text my={3}>{problem.question}</Text>
                  <RadioGroup>
                    <Stack gap={2}>
                      {problem.answers.map((answer) => (
                        <Radio
                          key={answer.id}
                          value={answer.id}
                          onChange={(e: any) =>
                            handleChangeAnswer(problem.id, e.target.value)
                          }
                          checked={
                            userAnswers.some(
                              (userAnswer) =>
                                userAnswer.problem_id === problem.id &&
                                userAnswer.answer_id === answer.id
                            ) ?? false
                          }
                        >
                          {answer.answer}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Box>
              ))
            ) : (
              <Text>Loading...</Text>
            )}
          </Stack>
          <Flex justifyContent="flex-end" mt={20}>
            <Button bg="biru.600" color="white" onClick={handleSubmit}>
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
