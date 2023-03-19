import CourseCard from "@/components/course_card";
import HomeSidebar from "@/components/home_sidebar";
import Layout from "@/components/layout";
import { SelectSearch } from "@/components/select_search";
import { Box, Heading, HStack, SimpleGrid, Stack } from "@chakra-ui/react";

export default function Home() {
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
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <CourseCard
                    key={i}
                    href="/courses/IF3270"
                    courseCode="IF3270"
                    major="Teknik Informatika"
                    courseName="Pembelajaran Mesin"
                    lecturer="Dr. Nur Ulfa Maulidevi, ST, M.Sc."
                    bgColor={
                      i % 3 === 0
                        ? "birukartu.200"
                        : i % 3 === 1
                        ? "birukartu.300"
                        : "birukartu.100"
                    }
                    majorColor={i % 3 === 2 ? "biru.600" : "white"}
                    courseNameColor={i % 3 === 2 ? "biru.600" : "white"}
                    lecturerColor={i % 3 === 2 ? "biru.600" : "white"}
                  />
                ))}
            </SimpleGrid>
          </Box>
        </Stack>
      </HStack>
    </Layout>
  );
}
