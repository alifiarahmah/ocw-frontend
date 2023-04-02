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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdAdd } from 'react-icons/md';

export default function NewQuiz() {
  const router = useRouter();

  return (
    <Layout title="Latihan Baru">
      <Heading my={5}>Latihan Baru</Heading>
      <Box p={5} borderRadius="lg" bg="white">
        <FormLabel htmlFor="title">Judul Latihan</FormLabel>
        <Input name="title" />
        <FormLabel htmlFor="week">Week</FormLabel>
        <Input name="week" />
        <Divider my={5} />
        <ProblemItem />
        <Divider my={5} />
        <HStack justifyContent="space-between">
          <Button leftIcon={<MdAdd />} bg="biru.600" color="white">
            Soal
          </Button>
          <HStack>
            <Button onClick={() => router.back()}>Batal</Button>
            <Button bg="biru.600" color="white" onClick={() => router.back()}>
              Simpan
            </Button>
          </HStack>
        </HStack>
      </Box>
    </Layout>
  );
}
