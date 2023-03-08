import CourseCard from "@/components/course_card";
import Layout from "@/components/layout";
import {
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { MdArrowBackIos, MdSearch } from "react-icons/md";

export default function Courses() {
  return (
    <Layout title="Courses List">
      <Stack
        justifyContent="space-between"
        direction={{ base: "column-reverse", lg: "row" }}
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
        {/* TODO: route to current fakultas/jurusan */}
        <Heading size="lg">STEI | Teknik Informatika</Heading>
      </Stack>
      <Heading size="lg" mt={10} mb={5} as="h1">
        Daftar Mata Kuliah
      </Heading>
      <SimpleGrid columns={{ base: 2, lg: 4 }} gap={7} alignItems="stretch">
        {Array(8)
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
    </Layout>
  );
}
