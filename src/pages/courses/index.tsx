import CourseCard from '@/components/course_card';
import Layout from '@/components/layout';
import http from '@/lib/http';
import { Course } from '@/types/course';
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
  const [rawCourses, setRawCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();

  const router = useRouter();

  useEffect(() => {
    http
      .get('/course')
      .then((res) => {
        setRawCourses(res.data.data);
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
    if (searchQuery === '') {
      setCourses(rawCourses);
      return;
    }
    console.log(searchQuery);
    // filter courses name or lecturer name or course code
    setCourses(
      rawCourses.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.lecturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

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
            onClick={router.back}
          />
          <InputGroup borderRadius={20}>
            <InputLeftElement>
              <MdSearch />
            </InputLeftElement>
            <Input
              name="search"
              placeholder="Cari Mata Kuliah"
              bg="white"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Stack>
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
            key={c.id}
            href={`/courses/details/${c.id}`}
            courseCode={c.id}
            major="Teknik Informatika"
            courseName={c.name}
            lecturer={c.lecturer}
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
