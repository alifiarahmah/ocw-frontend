import { AnswerOption } from '@/types/answer_option';
import { Problem } from '@/types/problem';
import {
  Box,
  Button,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

export interface ProblemItemProps {
  number: number | string;
  problem: Problem;
  problems: Problem[];
  setProblems: React.Dispatch<React.SetStateAction<Problem[]>>;
}

export default function ProblemItem({
  number,
  problem,
  problems,
  setProblems,
}: ProblemItemProps) {
  const [answers, setAnswers] = useState<AnswerOption[]>(problem.answers);

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProblems(
      problems.map((p) =>
        p.id === problem.id ? { ...p, question: e.target.value } : p
      )
    );
  };

  useEffect(() => {
    setProblems(
      problems.map((p) =>
        p.id === problem.id ? { ...p, answers: answers } : p
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  return (
    <HStack width="100%" alignItems="flex-start">
      <Box w="40%">
        <Text fontWeight="bold">Nomor {number}</Text>
        <Textarea
          name="question"
          placeholder="Pertanyaan..."
          my={5}
          onChange={handleChangeQuestion}
          value={problem.question}
        />
        <Stack gap={2}>
          {answers.map((o, i) => (
            <InputGroup key={i}>
              <Input
                placeholder={`opsi ${i + 1}`}
                onChange={(e) => {
                  setAnswers(
                    answers.map((a) =>
                      a.id === o.id ? { ...a, answer: e.target.value } : a
                    )
                  );
                }}
                value={o.answer}
              />
              <InputRightElement>
                <IconButton
                  aria-label={'Delete'}
                  icon={<MdDelete />}
                  // onClick={() => {
                  //   setAnswers(answers.filter((o, j) => i !== j));
                  // }}
                />
              </InputRightElement>
            </InputGroup>
          ))}

          <Button
            leftIcon={<MdAdd />}
            onClick={() => {
              setAnswers([
                ...answers,
                {
                  id: uuidv4(),
                  media_id: [],
                  answer: '',
                  is_solution: false,
                } as AnswerOption,
              ]);
            }}
          >
            Tambah opsi
          </Button>
        </Stack>
      </Box>
      <Box flexGrow="1">
        <FormLabel htmlFor="answer" mt={5}>
          Kunci Jawaban
        </FormLabel>
        <Select
          name="answer"
          value={answers.find((a) => a.is_solution)?.answer}
          onChange={(e) => {
            setAnswers(
              answers.map((a) =>
                a.answer === e.target.value ? { ...a, is_solution: true } : a
              )
            );
          }}
        >
          {answers.map((o) => (
            <option key={o.id} value={o.answer}>
              {o.answer}
            </option>
          ))}
        </Select>
        <FormLabel htmlFor="explanation" mt={5}>
          Pembahasan
        </FormLabel>
        <Textarea name="explanation" placeholder="Pembahasan..." />
      </Box>
    </HStack>
  );
}
