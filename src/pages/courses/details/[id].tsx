import RowAction from '@/components/course/row_action';
import CourseBanner from '@/components/course_banner';
import Layout from '@/components/layout';
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
import { MdArrowBackIos, MdPlayArrow } from 'react-icons/md';

export default function CourseDetails() {
  const router = useRouter();

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
                <Tr key="">
                  <Td>Introduction</Td>
                  <Td>1</Td>
                  <Td>
                    <RowAction
                      videoLink="/content_video"
                      handoutLink="/content_slide"
                    />
                  </Td>
                </Tr>
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
                          Video
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
          course_code="IF4020"
          course_name="Pengantar Sistem Informasi"
          lecturer="Siti Nuraini, S.Kom., M.Kom."
        />
      </HStack>
    </Layout>
  );
}
