import {
  Box,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

export interface Problem {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export default function ProblemItem() {
  const options: string[] = [];

  return (
    <HStack width="100%" alignItems="flex-start">
      <Box>
        <Text fontWeight="bold">Nomor 1</Text>
        <Textarea name="question" placeholder="Pertanyaan..." my={5} />
        <Stack gap={2}>
          <Input placeholder="Jawaban A" />
          <Input placeholder="Jawaban B" />
          <Input placeholder="Jawaban C" />
          <Input placeholder="Jawaban D" />
        </Stack>
      </Box>
      <Box flexGrow="1">
        <FormLabel htmlFor="answer" mt={5}>
          Kunci Jawaban
        </FormLabel>
        <Select name="answer">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
        </Select>
        <FormLabel htmlFor="explanation" mt={5}>
          Pembahasan
        </FormLabel>
        <Textarea name="explanation" placeholder="Pembahasan..." />
      </Box>
    </HStack>
  );
}
