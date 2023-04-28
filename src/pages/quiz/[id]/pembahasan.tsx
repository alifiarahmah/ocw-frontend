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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Pembahasan() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  useEffect(() => {
    setUserAnswers(JSON.parse(router.query.userAnswers as string));
    http
      .get(`/quiz/${router.query.id}/solution`, {
        headers: {
          Authorization: `Bearer ${getAvailableUserData()}`,
        },
      })
      .then((res) => {
        setName(res.data.data.name);
        setProblems(res.data.data.problems);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [router.query.id, router.query.userAnswers]);

  return (
    <Layout>
      <Heading my={5}>Pembahasan {name}</Heading>
      <Stack gap={3} mt={10}>
        {problems.map((problem, index) => (
          <>
            <Box key={problem.id} bg="white" borderRadius="lg" p={5}>
              <Text fontWeight="bold">Nomor {index + 1}</Text>
              <Text my={3}>{problem.question}</Text>
              <RadioGroup>
                <Stack gap={2}>
                  {problem.answers.map((answer) => (
                    <Radio
                      key={answer.id}
                      value={answer.id}
                      borderWidth="thick"
                      borderColor={
                        answer.is_solution
                          ? 'green.500'
                          : userAnswers.find(
                              (userAnswer) =>
                                userAnswer.problem_id == problem.id &&
                                userAnswer.answer_id == answer.id
                            )
                          ? 'red.500'
                          : 'gray.300'
                      }
                      isReadOnly
                    >
                      {answer.answer}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
            <Flex key={problem.id} bg="white" borderRadius="lg" p={5}>
              <Text fontWeight="bold">Jawaban:</Text>
              <Text ml={3}>
                {
                  // find the answer that has is_solution = true
                  problem.answers.find((answer) => answer.is_solution == true)
                    ?.answer || 'Tidak ada jawaban'
                }
              </Text>
            </Flex>
          </>
        ))}
      </Stack>
      <Flex justifyContent="flex-end" mt={10}>
        <Link href="/">
          <Button bg="biru.600" color="white">
            Selesai
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
}

export default Pembahasan;
