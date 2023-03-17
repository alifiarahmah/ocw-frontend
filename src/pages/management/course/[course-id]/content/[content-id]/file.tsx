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
  Center,
  Flex,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
  BoxProps,
  Spacer,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { MdArrowBackIos } from "react-icons/md";

export interface BannerProps extends BoxProps {
  bg?: string
  children: React.ReactNode
}

const CourseBanner : React.FC<BannerProps> = ({bg, children, ...props}) => {
  return (
    <HStack alignItems={"flex-start"} height="100%">
      <Box
          mt={0}
          px={props.p ?? props.px ?? { base: 5, md: 20 }}
          py={props.p ?? props.py ?? { base: 5, md: 10 }}
          width='100%'
          {...props}
          >
          {children}
        </Box>
      <Container minHeight="90vh" height="inherit" bgColor="magenta" width="50vh" flexGrow={1} overflowY={"auto"} position="absolute">
        <VStack align={'start'} spacing='6' marginStart='2vh' maxWidth="30vh">
          <VStack spacing='1' align={'start'}>
              <Text align={'start'} fontSize={'m'}>Kode Mata Kuliah</Text>
              <Text align={'start'} fontSize={'xl'} wordBreak="break-word">IF2240</Text>
          </VStack>
          <Divider borderColor={'black'} borderWidth={"1px"} w='75%' my={4} style={{marginLeft: "0vh"}}/>
          <VStack spacing='1' align={'start'}>
              <Text align={'start'} fontSize={'m'}>Mata Kuliah</Text>
              <Text align={'start'} fontSize={'xl'} wordBreak="break-word">Pembelajaran Mesin</Text>
          </VStack>
          <Divider borderColor={'black'} borderWidth={"1px"} w='75%' my={4} style={{marginLeft: "0vh"}}/>
          <VStack spacing='1' align={'start'}>
              <Text align={'start'} fontSize={'m'}>Dosen Pengajar</Text>
              <Text align={'start'} fontSize={'xl'} wordBreak="break-word">Dr. Nur Ulva Maulidevi, ST, M.Sc</Text>
          </VStack>
        </VStack>
      </Container>
    </HStack>
  )
}

export default function EditContent() {
  return (
    <Layout title="Edit Content" py={0} px={0}>
      <CourseBanner>
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
