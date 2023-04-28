import RowAction from '@/components/admin/row-action';
import Layout from '@/components/layout';
import Modal from '@/components/modal';
import http from '@/lib/http';
import { Quiz } from '@/types/quiz';
import {
  Box,
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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdAdd } from 'react-icons/md';

const quizzes = [
  {
    id: '440e9a7b-5fe5-481c-a98d-a1736e91f42b',
    nama: 'Latihan Sample',
    course_id: 'IF3270',
    creator_email: 'contributor@example.com',
  },
  {
    id: 'ca45c775-bb74-422e-943c-08e9601d6d41',
    nama: 'Latihan Beneran',
    course_id: 'IF3270',
    creator_email: 'contributor@example.com',
  },
];

export default function QuizManagement() {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirmDelete = () => {
    onClose();
    http
      .delete(`/quiz/${router.query.quiz_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then(() => {
        toast({
          title: 'Latihan berhasil dihapus',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: 'Gagal menghapus latihan',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  return (
    <>
      <Layout title="Quiz Management">
        <HStack justifyContent="space-between">
          <Box>
            <Heading>Daftar Latihan</Heading>
            <Text mt={3}>IF3270 Pembelajaran Mesin</Text>
          </Box>
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
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {quizzes.map((q: Quiz) => (
                <Tr key={q.id}>
                  <Td>{q.nama}</Td>
                  <Td>
                    <RowAction
                      onOpenEdit={() => {
                        router.push(`${router.asPath}/${q.id}/edit`);
                      }}
                      onOpenDelete={onOpen}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Layout>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header={'Hapus Latihan'}
        onConfirm={handleConfirmDelete}
      >
        Yakin ingin menghapus latihan?
      </Modal>
    </>
  );
}
