import Layout from '@/components/layout';
import styles from '@/styles/verifcation.module.css';
import {
  Button,
  Container,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { Merriweather, Poppins } from '@next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import emailpic from '../asset/email.png';

const poppins = Poppins({ weight: '100', subsets: ['latin'] });

const merriweather = Merriweather({ weight: '300', subsets: ['latin'] });

export default function VerTime() {
  const [timeInSec, setTime] = useState(600);
  const [destinationTime, setDT]: any[] = useState(
    new Date().getTime() + 600001
  );

  // Router
  const router = useRouter();

  useEffect(() => {
    // Workaround for annoying nodejs router bs
    if (!router.isReady) return;

    const interval = setInterval(() => {
      const diff = destinationTime - new Date().getTime();
      setTime(~~(diff / 1000));
      if (diff <= 999) {
        router.push('/');
      }
    });
    return () => clearInterval(interval);
    ``;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Account Verification</title>
      </Head>
      <Layout>
        <div className={styles.background}>
          <Container className={styles.container}>
            <a className={styles.h1}>
              <Text fontSize="2xl" className={merriweather.className}>
                <strong>
                  {' '}
                  <span className={styles.boldtext}>
                    {' '}
                    Pranala verifikasi telah dikirim melalui e-mail!
                  </span>{' '}
                </strong>{' '}
              </Text>
            </a>
            <a className={styles.h2}>
              <Text fontSize="l" className={poppins.className}>
                <strong>
                  {' '}
                  Silakan periksa e-mail Anda. Apabila tidak ditemukan, periksa
                  pada bagian spam <span className={styles.boldtext}></span>
                </strong>
              </Text>
            </a>
            <Image
              src={emailpic}
              alt="verification icon"
              placeholder="blur"
              className={styles.images}
            />

            <Stat placeSelf={'center'}>
              <Flex position={'relative'} direction={'column'} margin={'4vh'}>
                <StatLabel fontSize={'lg'} placeSelf={'center'}>
                  Time Remaining:
                </StatLabel>
                <StatNumber fontSize={'8vh'} placeSelf={'center'}>
                  {(~~(timeInSec / 60)).toString().padStart(2, '0')}:
                  {(timeInSec % 60).toString().padStart(2, '0')}
                </StatNumber>
              </Flex>
            </Stat>

            <Button fontSize={'sm'}>
              Email tidak ditemukan? kirim ulang verifikasi
            </Button>
          </Container>
        </div>
      </Layout>
    </>
  );
}
