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
import { MdAdd, MdDelete } from 'react-icons/md';
import { useState } from 'react';
import { Question } from '@/types/question';

export interface ProblemItemProps {
  id: number;
  question: Question;
}

export default function ProblemItem({ id, question }: ProblemItemProps) {
  const [options, setOptions] = useState(Array(1).fill(''));

  return (
    <HStack width="100%" alignItems="flex-start">
      <Box w="40%">
        <Text fontWeight="bold">Nomor {id}</Text>
        <Textarea name="question" placeholder="Pertanyaan..." my={5} />
        <Stack gap={2}>
          {options.map((o, i) => (
            <InputGroup key={i}>
              <Input
                placeholder={`opsi ${i + 1}`}
                onChange={(e) => {
                  setOptions(
                    options.map((o, j) => (i === j ? e.target.value : o))
                  );
                }}
                value={o}
              />
              <InputRightElement>
                <IconButton
                  aria-label={'Delete'}
                  icon={<MdDelete />}
                  onClick={() => {
                    setOptions(options.filter((o, j) => i !== j));
                  }}
                />
              </InputRightElement>
            </InputGroup>
          ))}

          <Button
            leftIcon={<MdAdd />}
            onClick={() => {
              setOptions([...options, '']);
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
        <Select name="answer">
          {options.map((o) => (
            <option value={o} key={o}>
              {o}
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
