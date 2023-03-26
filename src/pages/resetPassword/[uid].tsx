import Layout from '@/components/layout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  LockIcon,
  RepeatIcon,
  ViewIcon,
  ViewOffIcon,
  InfoIcon,
} from '@chakra-ui/icons';
import {
  Container,
  Text,
  Stack,
  Heading,
  Divider,
  FormControl,
  HStack,
  Input,
  Spacer,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  UnorderedList,
  ListItem,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Return = {
  uid: string;
};

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/reset/validate`, {
      headers: {
        Authorization: 'Bearer ' + context.query.uid,
      },
    })
    .catch((err) => {
      // Redirect to a 404
      context.res.writeHead(307, { Location: '/404' });
      context.res.end();
    });

  return { props: { uid: context.query.uid } };
}

function ResetPassword({ uid }: Return) {
  // States
  const [filled, setFilled] = useState(false);
  const [canSee, setSee] = useState(false);
  const [errorMsg, setMsg] = useState('');
  const [timeInSec, setTime] = useState(1800);
  const [destinationTime, setDT]: any[] = useState();

  // Form
  const { register, handleSubmit } = useForm();

  // Router
  const router = useRouter();

  const failCheck = (data: any) => {
    let error = '';
    if (!/\S{8,16}/.test(data.password)) {
      error = 'Password harus memiliki panjang 8-16 karakter';
    } else if (!/[A-Z]/.test(data.password) || !/[a-z]/.test(data.password)) {
      error = 'Password harus memiliki huruf besar dan kecil';
    } else if (!/[0-9]/.test(data.password)) {
      error = 'Password harus memiliki setidaknya satu angka';
    } else if (
      !/[\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\{\[\}\]\|\\\:\;\"\'\<\,\>\.\?\/]/.test(
        data.password
      )
    ) {
      error = 'Password harus memiliki setidaknya satu karakter spesial';
    } else if (
      !/^[a-zA-Z0-9\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\{\[\}\]\|\\\:\;\"\'\<\,\>\.\?\/]/.test(
        data.password
      )
    ) {
      error = 'Password mengandung karakter illegal';
    } else if (data.password != data.repeat) {
      error = 'Password harus sama';
    }
    setMsg(error);
    if (error == '') return false;
    return true;
  };

  const toggleSee = () => {
    setSee(!canSee);
  };

  const goHome = () => {
    router.push('/');
  };

  const onSubmit = (data: any) => {
    if (failCheck(data)) return;

    // TODO: Send Data to server
    axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/reset/confirm`,
      {
        password: data.password,
        password_validation: data.repeat,
      },
      {
        headers: {
          Authorization: 'Bearer ' + uid,
        },
      }
    );

    setFilled(true);
    setDT(new Date().getTime() + 31000);
  };

  // Effect for page update
  useEffect(() => {}, [errorMsg, canSee]);

  // Effect for Starting timer
  useEffect(() => {
    if (filled == true) {
      const interval = setInterval(() => {
        const diff = destinationTime - new Date().getTime();
        setTime(~~(diff / 1000));
        if (diff <= 999) {
          router.push('/');
        }
      });
      return () => clearInterval(interval);
    }
  }, [filled]);

  return (
    <>
      <Layout
        px={{ base: 5, md: 20 }}
        py={{ base: 5, md: 10 }}
        title={`Reset for `}
      >
        <Container
          minW="70vw"
          p="4rem"
          bg={'white'}
          borderRadius="lg"
          mt={5}
          centerContent
        >
          {!filled ? (
            <Stack
              direction="column"
              minH="25vh"
              justifyContent={'space-evenly'}
            >
              <Heading as="h1" size="2xl" textAlign="center">
                Silahkan Masukkan Password Baru
              </Heading>
              <Divider />
              <Text fontSize={'lg'} textAlign="center">
                Silahkan masukkan <b>password</b> anda yang baru. Password harus
                memiliki panjang antara <b>5-16 karakter</b>
              </Text>
              <FormControl onSubmit={handleSubmit(onSubmit)}>
                <form>
                  <Spacer boxSize={'5'} />
                  <HStack>
                    <LockIcon boxSize={10} color={'blue.500'} />
                    <Input
                      {...register('password')}
                      id="password"
                      type={canSee ? 'text' : 'password'}
                      placeholder="Masukkan Password Baru Anda di Sini"
                      isRequired
                    />
                    <Popover trigger="hover" placement="left-end">
                      <PopoverTrigger>
                        <InfoIcon boxSize={10} color={'blue.500'} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>
                          Password harus memenuhi syarat:
                        </PopoverHeader>
                        <PopoverBody>
                          <UnorderedList>
                            <ListItem>Di antara 8-16 karakter</ListItem>
                            <ListItem>
                              Paling sedikit 1 huruf besar dan 1 huruf kecil
                            </ListItem>
                            <ListItem>
                              Paling sedikit 1 angka dan 1 karakter spesial
                            </ListItem>
                          </UnorderedList>
                        </PopoverBody>
                        <PopoverFooter fontSize={'xs'}>
                          Karakter spesial:
                          {' ~`!@#$%^&*()_-+{[}]|\\:;"\'<,>.?/'}
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                  <Spacer boxSize={'5'} />
                  <HStack>
                    <RepeatIcon boxSize={10} color={'blue.500'} />
                    <Input
                      {...register('repeat')}
                      // isInvalid={}
                      id="repeat"
                      type={canSee ? 'text' : 'password'}
                      placeholder="Masukkan Ulang Password Anda"
                      isRequired
                    />
                    {canSee ? (
                      <ViewIcon
                        boxSize={10}
                        color={'blue.500'}
                        cursor={'pointer'}
                        onClick={toggleSee}
                      />
                    ) : (
                      <ViewOffIcon
                        boxSize={10}
                        color={'blue.500'}
                        cursor={'pointer'}
                        onClick={toggleSee}
                      />
                    )}
                  </HStack>
                  {errorMsg != '' ? (
                    <Text fontSize={'sm'} color={'red.500'} textAlign={'right'}>
                      {errorMsg}
                    </Text>
                  ) : null}
                  <Spacer boxSize={'10'} />
                  <HStack>
                    <Spacer />
                    <Button
                      type="submit"
                      alignSelf={'right'}
                      size="lg"
                      bg={'blue.500'}
                      color="white"
                      fontWeight={'medium'}
                    >
                      Reset Password
                    </Button>
                  </HStack>
                </form>
              </FormControl>
            </Stack>
          ) : (
            <Stack
              direction="column"
              minH="50vh"
              justifyContent={'space-between'}
            >
              <Heading as="h1" size="lg" textAlign="center">
                Password Anda Berhasil Direset!
              </Heading>
              <Divider />
              <Text fontSize={'lg'} textAlign="center">
                Tekan tombol di bawah untuk kembali ke <b>laman utama</b>. Anda
                akan otomatis diredirect setelah
              </Text>
              <Stat placeSelf={'center'}>
                <Flex direction={'row'} alignItems={'center'}>
                  <StatNumber fontSize={'5xl'} placeSelf={'center'}>
                    {timeInSec}
                  </StatNumber>
                  <StatLabel ml={'0.5rem'} fontSize={'lg'} placeSelf={'center'}>
                    Detik
                  </StatLabel>
                </Flex>
              </Stat>
              <Button
                onClick={goHome}
                size="md"
                bg={'blue.500'}
                color="white"
                fontWeight={'medium'}
                placeSelf={'flex-end'}
              >
                Kembali ke Beranda
              </Button>
            </Stack>
          )}
        </Container>
      </Layout>
    </>
  );
}

export default ResetPassword;
