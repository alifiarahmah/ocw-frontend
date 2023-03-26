import CourseCard from '@/components/course_card';
import HomeSidebar from '@/components/home_sidebar';
import Layout from '@/components/layout';
import { SelectSearch } from '@/components/select_search';
import http from '@/lib/http';
import { Course } from '@/types/course';
import { Box, Heading, HStack, SimpleGrid, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await http.get('/course');
        setCourses(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout py={0} px={0}>
      <HStack minH="90vh" alignItems="stretch">
        <HomeSidebar />
        <Stack w="100%" p={10} alignItems="center" gap={10}>
          <SelectSearch />
          <Box
            bg="white"
            borderRadius="lg"
            px={{ base: 5, lg: 10 }}
            py={{ base: 3, lg: 7 }}
            mt={{ base: 3, lg: 7 }}
          >
            <Heading fontSize="2xl">Featured Courses</Heading>
            <SimpleGrid
              columns={{ base: 2, lg: 3 }}
              gap={{ base: 3, lg: 7 }}
              alignItems="stretch"
              mt={{ base: 3, lg: 7 }}
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
          </Box>
        </Stack>
      </HStack>
    </Layout>
  );
}
