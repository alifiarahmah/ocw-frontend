import RowAction from '@/components/admin/row-action';
import Layout from '@/components/layout';
import { Quiz } from '@/types/quiz';
import {
  Button,
  Heading,
  HStack,
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
import { MdAdd } from 'react-icons/md';

const quizzes = [
  {
    id: 1,
    title: 'Latihan Soal Clustering 1',
    week: 1,
  },
  {
    id: 2,
    title: 'Latihan Soal Clustering 2',
    week: 2,
  },
  {
    id: 3,
    title: 'Latihan Soal Clustering 3',
    week: 3,
  },
];

export default function QuizManagement() {
  const router = useRouter();

  const handleEditButton = (quiz: Quiz) => {
    // TODO
  };

  const handleDeleteButton = (quiz: Quiz) => {
    // TODO
  };

  return (
    <Layout>
      <HStack justifyContent="space-between">
        <Heading>Daftar Latihan</Heading>
        <Link href={`${router.asPath}/add`}>
          <Button bg="biru.600" color="white">
            <MdAdd />
            <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
              Latihan Baru
            </Text>
          </Button>
        </Link>
      </HStack>
      <TableContainer>
        <Table variant="simple" bg={'white'} borderRadius="lg" mt={5}>
          <Thead textTransform="capitalize">
            <Tr>
              <Th>Judul Latihan Soal</Th>
              <Th>Week</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {quizzes.map((q: Quiz) => (
              <Tr key={q.id}>
                <Td>{q.title}</Td>
                <Td>{q.week}</Td>
                <Td>
                  <RowAction
                    onOpenEdit={() => {
                      handleEditButton(q);
                    }}
                    onOpenDelete={() => {
                      handleDeleteButton(q);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
