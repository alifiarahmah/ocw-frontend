import CourseBanner from '@/components/course_banner';
import Layout from '@/components/layout';
import http from '@/lib/http';
import { Material } from '@/types/material';
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

  useEffect(() => {
    if (router.query.id) {
      http.get(`/course/${router.query.id}`).then((res) => {
        setCourseName(res.data.data.name);
        setLecturer(res.data.data.lecturer);
      });
      http.get(`/course/${router.query.id}/materials`).then((res) => {
        setMaterials(res.data.data);
      });
    }
  }, [router.query.id]);

  return (
    <Layout p={0}>
      <HStack justifyContent="space-between" alignItems="flex-start">
        <Box p={10}>
          <HStack my={5}>
            <IconButton
              aria-label="back"
              icon={<MdArrowBackIos />}
              variant="ghost"
              onClick={router.back}
            />
            <Heading>Daftar Materi</Heading>
          </HStack>
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
                          <Link href={content.link} key={content.id}>
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

          <Heading mt={10} mb={5}>
            Daftar Latihan Soal
          </Heading>
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
                  <Th>Week</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr key="">
                  <Td>Introduction</Td>
                  <Td>1</Td>
                  <Td>
                    <Link href={'/quiz/1/start'}>
                      <Button size="sm" colorScheme="yellow">
                        <MdPlayArrow />
                        <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
                          mulai
                        </Text>
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <CourseBanner
          course_code={router.query.id as string}
          course_name={courseName}
          lecturer={lecturer}
        />
      </HStack>
    </Layout>
  );
}
