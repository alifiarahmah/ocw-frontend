import RowAction from '@/components/admin/row-action';
import Layout from '@/components/layout';
import AddCourseModal from '@/components/management/course/add-course-modal';
import DeleteCourseModal from '@/components/management/course/delete-course-modal';
import EditCourseModal from '@/components/management/course/edit-course-modal';
import http from '@/lib/http';
import { Course } from '@/types/course';
import { Major } from '@/types/major';
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
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course>({
    id: '',
    name: '',
    major_id: '',
    major: '',
    description: '',
    abbreviation: '',
    lecturer: '',
  });
  const [majors, setMajors] = useState<Major[]>([]);
  const [name, setName] = useState('');
  const [selectedMajorId, setSelectedMajorId] = useState('');
  const [description, setDescription] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [abbreviation, setAbbreviation] = useState('');

  const toast = useToast();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await http.get('/course');
        setCourses(res.data.data);
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Gagal mengambil data course.',
          status: 'error',
        });
      }
    };
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getMajors = async () => {
      try {
        const res = await http.get('/course/major');
        setMajors(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMajors();
  }, []);

  const handleEditButton = (course: Course) => {
    // TODO
    onOpenEdit();
  };

  const handleDeleteButton = (course: Course) => {
    // TODO
    onOpenDelete();
  };

  const handleAdd = () => {
    // TODO: change to use API
    toast({
      title: 'Success',
      description: 'Berhasil menambah course.',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
    onCloseAdd();
  };

  const handleEdit = (course: Course) => {
    // TODO: change to use API
    toast({
      title: 'Success',
      description: 'Berhasil mengedit course.',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
    onCloseEdit();
  };

  const handleDelete = (course: Course) => {
    // TODO: change to use API
    toast({
      title: 'Success',
      description: 'Berhasil menghapus course.',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
    onCloseDelete();
  };

  return (
    <>
      <Layout>
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
                  <Td>{c.name}</Td>
                  <Td>{c.major as string}</Td>
                  <Td>{c.lecturer}</Td>
                  <Td>{c.id}</Td>
                  <Td>
                    <RowAction
                      onOpenEdit={() => {
                        handleEditButton(c);
                      }}
                      onOpenDelete={() => {
                        handleDeleteButton(c);
                      }}
                    />
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
        handleConfirm={handleAdd}
        majors={majors}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        selectedMajorId={selectedMajorId}
        setSelectedMajorId={setSelectedMajorId}
        lecturer={lecturer}
        setLecturer={setLecturer}
        abbreviation={abbreviation}
        setAbbreviation={setAbbreviation}
      />

      <EditCourseModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        handleConfirm={() => handleEdit(selectedCourse)}
        majors={majors}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        selectedMajorId={selectedMajorId}
        setSelectedMajorId={setSelectedMajorId}
        lecturer={lecturer}
        setLecturer={setLecturer}
        abbreviation={abbreviation}
        setAbbreviation={setAbbreviation}
      />

      <DeleteCourseModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleConfirm={() => handleDelete(selectedCourse)}
      />
    </>
  );
}
