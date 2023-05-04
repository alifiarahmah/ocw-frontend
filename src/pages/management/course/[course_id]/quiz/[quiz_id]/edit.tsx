import Layout from '@/components/layout';
import ProblemItem from '@/components/management/course/quiz/problem-item';
import http from '@/lib/http';
import { getAvailableUserData } from '@/lib/token';
import { Problem } from '@/types/problem';
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
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

export default function EditQuiz() {
  const router = useRouter();
  const toast = useToast();
  const quizId = router.query.quiz_id as string;
  const course_id = router.query.course_id as string;
  const [quizName, setQuizName] = useState('');
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    if (!quizId) return;
    http
      .get(`/quiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${getAvailableUserData()}`,
        },
      })
      .then((res) => {
        setQuizName(res.data.data.nama);
      })
      .catch((err) => console.log(err));
    http
      .get(`/quiz/link/${quizId}`, {
        headers: {
          Authorization: `Bearer ${getAvailableUserData()}`,
        },
      })
      .then((res) => {
        // parse the link
        const link = res.data.data.path;
        axios
          .get(`${process.env.NEXT_PUBLIC_BUCKET_URL}/${link}`)
          .then((res) => {
            setProblems(res.data.problems);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const handleSubmit = () => {
    http
      .patch(
        `/quiz/${quizId}`,
        {
          name: quizName,
          course_id,
        },
        {
          headers: {
            Authorization: `Bearer ${getAvailableUserData()}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const id = res.data.data.id;
        const uploadLink = res.data.data.upload_link;
        axios
          .put(
            uploadLink,
            {
              id,
              name: quizName,
              course_id,
              description: '',
              help: '',
              media: [],
              problems,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-amz-acl': 'public-read',
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
              toast({
                title: 'Latihan berhasil diubah',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              router.back();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout title="Ubah Latihan">
      <Heading my={5}>Ubah Latihan</Heading>
      <Box p={5} borderRadius="lg" bg="white">
        <FormLabel htmlFor="title">Judul Latihan</FormLabel>
        <Input
          name="title"
          isRequired
          onChange={(e) => setQuizName(e.target.value)}
          value={quizName}
        />
        {/* <FormLabel htmlFor="week">Week</FormLabel>
        <Input name="week" /> */}
        <Divider my={5} />
        {problems.map((q, i) => (
          <>
            <ProblemItem
              number={i + 1}
              problems={problems}
              problem={q}
              setProblems={setProblems}
            />
            <Divider my={5} />
          </>
        ))}
        <HStack justifyContent="space-between">
          {/* Tambah soal */}
          <Button
            leftIcon={<MdAdd />}
            bg="biru.600"
            color="white"
            onClick={() =>
              setProblems([
                ...problems,
                {
                  id: uuidv4(),
                  media_id: [] as any,
                } as Problem,
              ])
            }
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
