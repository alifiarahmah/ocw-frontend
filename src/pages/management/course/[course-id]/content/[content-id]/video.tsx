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
  Container,
} from "@chakra-ui/react";
import { MdArrowBackIos } from "react-icons/md";

export default function EditContent() {
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
          <Heading size="md" className="center">Menambah Video Materi</Heading>
        </CardHeader>
        <CardBody>
          <form>
            <FormControl isRequired>
              <FormLabel>Judul Handout</FormLabel>
              <Input/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Downloadable</FormLabel>
              <Select>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Link Youtube</FormLabel>
              <Input></Input>
            </FormControl>
            <Container height={30}/>
            <Button type="submit" backgroundColor="blue.400">Tambah</Button>
          </form>
        </CardBody>
      </Card>
    </Layout>
  );
}
