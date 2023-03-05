import CourseCard from "@/components/course_card";
import Layout from "@/components/layout";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { MdArrowBackIos, MdSearch } from "react-icons/md";

export default function Courses() {
  return (
    <Layout title="Edit Content">
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
          <Heading size="lg" mt={10} mb={5} as="h1">
            Decision Tree Learning (DTL)
          </Heading>
        </Stack>
      </Stack>
      <Card mt={10}>
        <CardHeader>
          <Heading size="md" className="center">Menambah Handout Materi</Heading>
        </CardHeader>
        <CardBody>
          <form>
            <FormControl>
              <FormLabel>Judul Handout</FormLabel>
              <Input/>
            </FormControl>
            <FormControl>
              <FormLabel>Downloadable</FormLabel>
              <Select placeholder="Select option">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Upload File</FormLabel>
              <Input type="file"></Input>
            </FormControl>
            <Button type="submit">Tambah</Button>
          </form>
        </CardBody>
      </Card>
    </Layout>
  );
}
