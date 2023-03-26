/* eslint-disable react-hooks/exhaustive-deps */
import CourseCard from '@/components/course_card';
import Layout from '@/components/layout';
import http from '@/lib/http';
import { Course } from '@/types/course';
import { Major } from '@/types/major';
import {
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdArrowBackIos, MdSearch } from 'react-icons/md';

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [major, setMajor] = useState<Major>();
  const toast = useToast();

  const router = useRouter();
  // get id
  const id = router.query.id;

  useEffect(() => {
    if (!id) return;
    const getCourses = async () => {
      try {
        const res = await http.get(`/course/major/courses/${id}`);
        setCourses(res.data.data);
        console.log(courses);
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Gagal mengambil data mata kuliah.',
          status: 'error',
        });
      }
    };
    getCourses();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const getMajor = async () => {
      try {
        const res = await http.get(`/course/major/${id}`);
        setMajor(res.data.data);
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Gagal mengambil data jurusan.',
          status: 'error',
        });
      }
    };
    getMajor();
  }, [id]);

  return (
    <Layout title="Courses List">
      <Stack
        justifyContent="space-between"
        direction={{ base: 'column-reverse', lg: 'row' }}
        gap={3}
      >
        <Stack direction="row">
          <IconButton
            aria-label="back"
            icon={<MdArrowBackIos />}
            variant="ghost"
          />
          <InputGroup borderRadius={20}>
            <InputLeftElement>
              <MdSearch />
            </InputLeftElement>
            <Input name="search" placeholder="Cari Mata Kuliah" bg="white" />
          </InputGroup>
        </Stack>
        <Heading size="lg">
          {major?.Faculty.Abbreviation} | {major?.Name}
        </Heading>
      </Stack>
      <Heading size="lg" mt={10} mb={5} as="h1">
        Daftar Mata Kuliah
      </Heading>
      <SimpleGrid
        columns={{ base: 2, lg: 4 }}
        gap={7}
        alignItems="stretch"
        justifyItems="stretch"
      >
        {courses.map((c, i) => (
          <CourseCard
            key={c.ID}
            href={`/courses/${c.ID}`}
            courseCode={c.ID}
            major={c.Major.Name}
            courseName={c.Name}
            lecturer={c.Lecturer}
            bgColor={
              i % 3 === 0
                ? 'birukartu.200'
                : i % 3 === 1
                ? 'birukartu.300'
                : 'birukartu.100'
            }
            majorColor={i % 3 === 2 ? 'biru.600' : 'white'}
            courseNameColor={i % 3 === 2 ? 'biru.600' : 'white'}
            lecturerColor={i % 3 === 2 ? 'biru.600' : 'white'}
          />
        ))}
      </SimpleGrid>
    </Layout>
  );
}
function useParams<T>(): { id: any } {
  throw new Error('Function not implemented.');
}
