import Layout from '@/components/layout';
import ProblemItem from '@/components/management/course/quiz/problem-item';
import {
  Box,
  Button,
  Divider,
  FormLabel,
  Heading,
  HStack,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Question } from '@/types/question';

export default function EditQuiz() {
  const router = useRouter();
  const toast = useToast();
  const [questions, setQuestions] = useState<Question[]>(
    Array(1).fill({} as Question)
  );

  const handleSubmit = () => {
    toast({
      title: 'Latihan berhasil dibuat',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    router.back();
  };

  return (
    <Layout title="Latihan Baru">
      <Heading my={5}>Ubah Latihan</Heading>
      <Box p={5} borderRadius="lg" bg="white">
        <FormLabel htmlFor="title">Judul Latihan</FormLabel>
        <Input name="title" />
        <FormLabel htmlFor="week">Week</FormLabel>
        <Input name="week" />
        <Divider my={5} />
        {questions.map((q, i) => (
          <>
            <ProblemItem id={i + 1} question={q} />
            <Divider my={5} />
          </>
        ))}
        <HStack justifyContent="space-between">
          <Button
            leftIcon={<MdAdd />}
            bg="biru.600"
            color="white"
            onClick={() => setQuestions([...questions, {} as Question])}
          >
            Soal
          </Button>
          <HStack>
            <Button onClick={() => router.back()}>Batal</Button>
            <Button bg="biru.600" color="white" onClick={handleSubmit}>
              Simpan
            </Button>
          </HStack>
        </HStack>
      </Box>
    </Layout>
  );
}
