import CourseBanner from '@/components/course_banner';
import Layout from '@/components/layout';
import http from '@/lib/http';
import { Material } from '@/types/material';
import { Quiz } from '@/types/quiz';
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdArrowBackIos, MdAttachFile, MdPlayArrow } from 'react-icons/md';

export default function CourseDetails() {
  const router = useRouter();
  const [courseName, setCourseName] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    if (router.query.id) {
      http.get(`/course/${router.query.id}`).then((res) => {
        setCourseName(res.data.data.name);
        setLecturer(res.data.data.lecturer);
      });
      http.get(`/course/${router.query.id}/materials`).then((res) => {
        setMaterials(res.data.data);
      });
      http.get(`/course/${router.query.id}/quiz`).then((res) => {
        setQuizzes(res.data.data);
      });
    }
  }, [router.query.id]);

  return (
    <Layout title={`${router.query.id} ${courseName}`} p={0}>
      <CourseBanner
        course_code={router.query.id as string}
        course_name={courseName}
        lecturer={lecturer}
      >
        <Box p={5}>
          <HStack my={5}>
            <IconButton
              aria-label="back"
              icon={<MdArrowBackIos />}
              variant="ghost"
              onClick={router.back}
            />
            <Heading>Daftar Materi</Heading>
          </HStack>
          {materials.length > 0 ? (
            <TableContainer>
              <Table
                size="lg"
                variant="simple"
                bg={'white'}
                borderRadius="lg"
                mt={5}
              >
                <Thead textTransform="capitalize">
                  <Tr>
                    <Th>Judul Materi</Th>
                    <Th>Week</Th>
                    <Th>Bahan</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {materials.map((material) => (
                    <Tr key="">
                      <Td>{material.name}</Td>
                      <Td>{material.week}</Td>
                      <Td>
                        <HStack my={0} py={0}>
                          {material.contents.map((content) => (
                            <Link
                              href={
                                content.type === 'handout'
                                  ? process.env.NEXT_PUBLIC_BUCKET_URL +
                                    '/' +
                                    content.link
                                  : content.link
                              }
                              target="_blank"
                              key={content.id}
                            >
                              <Button
                                size="sm"
                                colorScheme={
                                  content.type === 'video' ? 'red' : 'yellow'
                                }
                              >
                                {content.type === 'video' ? (
                                  <MdPlayArrow />
                                ) : (
                                  <MdAttachFile />
                                )}
                                <Text
                                  ml={2}
                                  display={{ base: 'none', lg: 'flex' }}
                                >
                                  {content.type}
                                </Text>
                              </Button>
                            </Link>
                          ))}
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Text textAlign="center" my={10}>
              Belum ada materi
            </Text>
          )}

          <Heading mt={10} mb={5}>
            Daftar Latihan Soal
          </Heading>
          {quizzes.length > 0 ? (
            <TableContainer>
              <Table
                size="lg"
                variant="simple"
                bg={'white'}
                borderRadius="lg"
                mt={5}
              >
                <Thead textTransform="capitalize">
                  <Tr>
                    <Th>Judul Latihan Soal</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {quizzes.map((quiz) => (
                    <Tr key={quiz.id}>
                      <Td>{quiz.nama}</Td>
                      <Td>
                        <Link href={`/quiz/${quiz.id}/start`}>
                          <Button size="sm" colorScheme="yellow">
                            <MdPlayArrow />
                            <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
                              mulai
                            </Text>
                          </Button>
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Text textAlign="center" my={10}>
              Belum ada latihan soal
            </Text>
          )}
        </Box>
      </CourseBanner>
    </Layout>
  );
}
