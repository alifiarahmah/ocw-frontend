import Head from 'next/head';
import { Container, Center, Text, Button } from '@chakra-ui/react';
import styles from '@/styles/verifcation.module.css';
import { Poppins, Merriweather } from '@next/font/google';
import Image from 'next/image';
import emailpic from '../asset/email.png';
import Layout from '@/components/layout';

// const poppins = Poppins({weight:"100", subsets:['latin'],})

// const merriweather = Merriweather({weight:"300", subsets:['latin'],})

const poppins = Poppins({ weight: '100', subsets: ['latin'] });

const merriweather = Merriweather({ weight: '300', subsets: ['latin'] });

export default function ver_success() {
  return (
    <Layout title="Account Verification">
      <div className={styles.background}>
        <Container className={styles.container}>
          <a className={styles.h1}>
            <Text fontSize="4xl" className={merriweather.className}>
              <strong>
                {' '}
                <span className={styles.boldtext}>
                  {' '}
                  E-mail telah terverifikasi!
                </span>{' '}
              </strong>{' '}
            </Text>
          </a>
          <a className={styles.h2}>
            <Text className={poppins.className}>
              <strong>
                {' '}
                Selamat, akun Anda telah terverifikasi. tekan tombol di bawah
                ini untuk melanjutkan ke menu utama{' '}
                <span className={styles.boldtext}>
                  {' '}
                  menekan tombol di bawah{' '}
                </span>
              </strong>
            </Text>
          </a>
          <Image
            src={emailpic}
            alt="verification icon"
            placeholder="blur"
            className={styles.images}
          />

          <Button
            size={'4xl'}
            textColor={'black'}
            colorScheme="cyan"
            rounded={'2xl'}
            className={styles.button}
          >
            Mulai Belajar!
          </Button>
        </Container>
      </div>
    </Layout>
  );
}
