import Layout from "@/components/layout";
import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

function pembahasan() {
  return (
    <Layout>
      <Heading>Pembahasan Latihan Clustering 1</Heading>
      <Stack gap={3} mt={10}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <Box key="item" bg="white" borderRadius="lg" p={5}>
            <Text fontWeight="bold">Nomor {item}</Text>
            <Text my={3}>Ini adalah soalnya...</Text>
            <form>
              <RadioGroup>
                <Stack gap={2}>
                  <Radio value="a">Jawaban A</Radio>
                  <Radio value="b">Jawaban B</Radio>
                  <Radio value="c" >Jawaban C</Radio>
                  <Radio value="d">Jawaban D</Radio>
                </Stack>
              </RadioGroup>
            </form>
          </Box>
        ))}
      </Stack>
      <Flex justifyContent="flex-end" mt={10}>
        <Button bg="biru.600" color="white">Selesai</Button>
      </Flex>
    </Layout>
  );
}

export default pembahasan;
