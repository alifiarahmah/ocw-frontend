import Layout from '@/components/layout';
import { UserAnswer } from '@/types/user_answer';
import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Pembahasan() {
  const router = useRouter();
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  useEffect(() => {
    // parse user answer as UserAnswer[] from router.query.userAnswers
    setUserAnswers(JSON.parse(router.query.userAnswers as string));
  }, [router.query.userAnswers]);

  return (
    <Layout>
      <Heading>Pembahasan Latihan Clustering 1</Heading>
      <Stack gap={3} mt={10}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <>
            <Box key="item" bg="white" borderRadius="lg" p={5}>
              <Text fontWeight="bold">Nomor {item}</Text>
              <Text my={3}>Ini adalah soalnya...</Text>
              <RadioGroup>
                <Stack gap={2}>
                  <Radio
                    borderWidth="thick"
                    borderColor="green"
                    isReadOnly
                    value="a"
                  >
                    Jawaban A
                  </Radio>
                  <Radio isReadOnly value="b">
                    Jawaban B
                  </Radio>
                  <Radio
                    borderWidth="thick"
                    borderColor="red"
                    isReadOnly
                    value="c"
                  >
                    Jawaban C
                  </Radio>
                  <Radio isReadOnly value="d">
                    Jawaban D
                  </Radio>
                  {/* colorScheme untuk warna ketika dipilih, bgColor untuk warna lingkaran dalam, borderColor untuk warna ring luar */}
                </Stack>
              </RadioGroup>
              {/* <form>
            </form> */}
            </Box>
            <Box key="item" bg="white" borderRadius="lg" p={5}>
              <Text fontWeight="bold">Pembahasan Nomor {item}</Text>
              <Text my={3}>Ini adalah pembahasannya...</Text>
            </Box>
          </>
        ))}
      </Stack>
      <Flex justifyContent="flex-end" mt={10}>
        <Link href="/">
          <Button bg="biru.600" color="white">
            Selesai
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
}

export default Pembahasan;
