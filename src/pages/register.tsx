import Head from 'next/head';
import {
  Container,
  Center,
  Text,
  Input,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import styles from '@/styles/Register.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { update } from 'cypress/types/lodash';
import http from '../lib/http';
import Link from 'next/link';
import isEmail from 'validator/lib/isEmail';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isPasswordValid = (pass: string) => {
    const consistUppercase = pass != pass.toLowerCase();
    const consistLowercase = pass != pass.toUpperCase();
    const consistNumber = /\d/.test(pass);
    return (
      pass.length >= 8 &&
      pass.length <= 18 &&
      consistUppercase &&
      consistLowercase &&
      consistNumber
    );
  };

  const disableSubmit = () => {
    return (
      name.length == 0 ||
      !isEmail(email) ||
      !isPasswordValid(password) ||
      password !== confirmPassword
    );
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const user = {
      name: name,
      email: email,
      password: password,
      password_validation: confirmPassword,
    };
    http
      .post('/auth/register', user)
      .then(
        (response) => {
          alert('Success');
          router.push('/login');
        },
        (error) => {
          alert('Terjadi kesalahan dalam registrasi');
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className={styles.background}>
        <Container className={styles.container}>
          <Center>Daftar</Center>
          <form className={styles.form} onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Nama</FormLabel>
              <Input
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!isEmail(email) && email.length > 0}
            >
              <FormLabel>Alamat Email</FormLabel>
              <Input
                placeholder="Alamat Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormErrorMessage>Alamat email tidak valid</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!isPasswordValid(password) && password.length > 0}
            >
              <FormLabel>Kata Sandi</FormLabel>
              <Input
                placeholder="Kata Sandi"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>
                Kata sandi harus mengandung 8-18 karakter dan setidaknya
                terdapat satu huruf kapital, satu huruf kecil, satu angka
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                password != confirmPassword && confirmPassword.length > 0
              }
            >
              <FormLabel>Konfirmasi Kata Sandi</FormLabel>
              <Input
                placeholder="Konfirmasi Kata Sandi"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormErrorMessage>Kata sandi tidak sama</FormErrorMessage>
            </FormControl>
            <Text>
              Dengan menekan tombol daftar di bawah ini, saya menyetujui
              Persyaratan Layanan dan Kebijakan Privasi kami.
            </Text>
            <Button
              className={styles.button}
              backgroundColor="#0d4c92"
              color="white"
              type="submit"
              isDisabled={disableSubmit()}
              isLoading={isLoading}
            >
              Daftar
            </Button>
          </form>
          <Center>
            Sudah punya akun?{' '}
            <Link href={'/login'} className={styles.login}>
              Login sekarang!
            </Link>
          </Center>
        </Container>
      </div>
    </>
  );
};

export default Register;
