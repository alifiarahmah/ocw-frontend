import RowAction from '@/components/admin/row-action';
import Layout from '@/components/layout';
import AddCourseModal from '@/components/management/course/add-course-modal';
import DeleteCourseModal from '@/components/management/course/delete-course-modal';
import EditCourseModal from '@/components/management/course/edit-course-modal';
import http from '@/lib/http';
import { getAccessToken, getAvailableUserData } from '@/lib/token';
import { Course } from '@/types/course';
import { Major } from '@/types/major';
import { UserClaim } from '@/types/token';
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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';

export default function CourseManagement() {
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [courseId, setCourseId] = useState('');
  const [name, setName] = useState('');
  const [majabbr, setMajabbr] = useState('');
  const [courseAbbr, setCourseAbbr] = useState('');
  const [description, setDescription] = useState('');
  const [lecturer, setLecturer] = useState('');

  const [email, setEmail] = useState(''); // taken from token

  const toast = useToast();

  useEffect(() => {
    const getUserData = async () => {
      const userData = getAvailableUserData();
      if (userData) {
        const user = userData as UserClaim;
        setEmail(user.email);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    http
      .get('/course')
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: 'Gagal mengambil data mata kuliah.',
          status: 'error',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    http
      .get(`/course/major`)
      .then((res) => {
        setMajors(res.data.data);
        setMajabbr(res.data.data[0].abbreviation);
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: 'Gagal mengambil data jurusan.',
          status: 'error',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditButton = (course: Course) => {
    setCourseId(course.id);
    setName(course.name);
    setMajabbr(course.id.slice(0, 2));
    setCourseAbbr(course.abbreviation);
    setDescription(course.description);
    setLecturer(course.lecturer);
    onOpenEdit();
  };

  const handleDeleteButton = (course: Course) => {
    setCourseId(course.id);
    onOpenDelete();
  };

  const handleAdd = () => {
    http
      .put(
        '/course',
        {
          id: courseId,
          name,
          majabbr,
          email,
          abbreviation: courseAbbr,
          description,
          lecturer,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      )
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Berhasil menambah course.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err: AxiosError) => {
        toast({
          title: 'Gagal menambah course.',
          description: `${err.response?.data}`,
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      });
    onCloseAdd();
  };

  const handleEdit = () => {
    http
      .patch(
        `/course/${courseId}`,
        {
          name,
          majabbr,
          email,
          abbreviation: courseAbbr,
          description,
          lecturer,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      )
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Berhasil mengedit course.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err: AxiosError) => {
        toast({
          title: 'Gagal mengedit course.',
          description: `${err.response?.data}`,
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      });
    onCloseEdit();
  };

  const handleDelete = () => {
    http
      .delete(`/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Berhasil menghapus course.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Gagal menghapus course.',
          description: `${err.response.statusText}`,
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      });
    onCloseDelete();
  };

  return (
    <>
      <Layout title="Course Management">
        <HStack justifyContent="space-between">
          <Heading>Daftar Course</Heading>
          <Button bg="biru.600" color="white" onClick={onOpenAdd}>
            <MdAdd />
            <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
              New Course
            </Text>
          </Button>
        </HStack>
        <TableContainer>
          <Table variant="simple" bg={'white'} borderRadius="lg" mt={5}>
            <Thead textTransform="capitalize">
              <Tr>
                <Th>Course</Th>
                <Th>Major</Th>
                <Th>Lecturer</Th>
                <Th>Code</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map((c: Course) => (
                <Tr key={c.id}>
                  <Td>
                    <Text>{c.name}</Text>
                    <HStack my={1}>
                      <Link href={router.asPath + '/'}>
                        <Button size="sm" onClick={e => router.push(router.asPath + `/${c.id}/material`)}>
                          <Text display={{ base: 'none', lg: 'flex' }}>
                            Materi
                          </Text>
                        </Button>
                      </Link>
                      <Link href={router.asPath + `/${c.id}/quiz`}>
                        <Button size="sm" onClick={onOpenEdit}>
                          <Text display={{ base: 'none', lg: 'flex' }}>
                            Quiz
                          </Text>
                        </Button>
                      </Link>
                    </HStack>
                  </Td>
                  {/* TODO: ask backend for abbreviation */}
                  <Td>{c.id.slice(0, 2)}</Td>
                  <Td>{c.lecturer.length > 0 ? c.lecturer : '-'}</Td>
                  <Td>{c.id}</Td>
                  <Td>
                    <HStack>
                      <RowAction
                        onOpenEdit={() => {
                          handleEditButton(c);
                        }}
                        onOpenDelete={() => {
                          handleDeleteButton(c);
                        }}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Layout>

      <AddCourseModal
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        handleConfirm={() => handleAdd()}
        id={courseId}
        setId={setCourseId}
        name={name}
        setName={setName}
        majors={majors}
        majabbr={majabbr}
        setMajabbr={setMajabbr}
        abbreviation={courseAbbr}
        setAbbreviation={setCourseAbbr}
        description={description}
        setDescription={setDescription}
        lecturer={lecturer}
        setLecturer={setLecturer}
      />

      <EditCourseModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        handleConfirm={() => handleEdit()}
        id={courseId}
        name={name}
        setName={setName}
        majors={majors}
        majabbr={majabbr}
        setMajabbr={setMajabbr}
        abbreviation={courseAbbr}
        setAbbreviation={setCourseAbbr}
        description={description}
        setDescription={setDescription}
        lecturer={lecturer}
        setLecturer={setLecturer}
      />

      <DeleteCourseModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleConfirm={() => handleDelete()}
      />
    </>
  );
}
