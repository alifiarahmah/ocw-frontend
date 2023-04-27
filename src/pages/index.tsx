import CourseCard from '@/components/course_card';
import CourseCardSkeleton from '@/components/course_card_skeleton';
import HomeSidebar from '@/components/home_sidebar';
import Layout from '@/components/layout';
import { SelectSearch } from '@/components/select_search';
import http from '@/lib/http';
import { Course } from '@/types/course';
import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    http
      .get('/course')
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <CourseCardSkeleton key={i} />
                  ))
                : courses.map((c, i) => (
                    <CourseCard
                      key={c.id}
                      href={`/courses/details/${c.id}`}
                      courseCode={c.id}
                      major="Teknik Informatika" // TODO: ask backend to return major name
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
            <Link href="/courses">
              <HStack justifyContent="right" alignItems="center" mt={7}>
                <Text>See all courses</Text>
                <MdNavigateNext />
              </HStack>
            </Link>
          </Box>
        </Stack>
      </HStack>
    </Layout>
  );
}
