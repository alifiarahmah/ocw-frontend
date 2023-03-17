import Layout from "@/components/layout";
import CourseBanner from "@/components/course_banner";
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
  Center,
} from "@chakra-ui/react";
import { MdArrowBackIos } from "react-icons/md";

export default function EditContent() {
  return (
    <Layout title="Edit Content" py={0} px={0}>
      <CourseBanner course_code="IF3000" course_name="Pembeleajarajran amesin" lecturer="Bu ulfa">
        <Stack>
          <Stack
            justifyContent="space-between"
            direction={{ lg: "row" }}
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
            <Center>
            <CardHeader>
              <Heading size="md" className="center">Menambah Handout Materi</Heading>
            </CardHeader>
            </Center>
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
                  <FormLabel>Upload File</FormLabel>
                  <Input type="file"></Input>
                </FormControl>
                <Container height={30}/>
                <Button type="submit" backgroundColor="blue.400">Tambah</Button>
              </form>
            </CardBody>
          </Card>
        </Stack>
      </CourseBanner>
    </Layout>
  );
}
