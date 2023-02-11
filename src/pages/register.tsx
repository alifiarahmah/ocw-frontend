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
    FormHelperText } from '@chakra-ui/react';
import styles from '@/styles/Register.module.css';

const Register = () => {
    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <div className={styles.background}>
                <Container className={styles.container}>
                    <Center>Daftar</Center>
                    <FormControl isRequired>
                        <FormLabel>Nama</FormLabel>
                        <Input placeholder='Nama'></Input>
                        <FormLabel>Alamat Email</FormLabel>
                        <Input placeholder='Alamat Email'></Input>
                        <FormLabel>Kata Sandi</FormLabel>
                        <Input placeholder='Kata Sandi'></Input>
                        <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                        <Input placeholder='Konfirmasi Kata Sandi'></Input>
                    </FormControl>
                    <Checkbox>Saya ingin menjadi kontributor</Checkbox>
                    <Text>Dengan menekan tombol daftar di bawah ini, saya menyetujui Persyaratan Layanan dan Kebijakan Privasi kami.</Text> 
                    <Button className={styles.button} backgroundColor='#0d4c92' color='white'>Daftar</Button>
                    <Center>Sudah punya akun? Login sekarang!</Center>
                </Container>
            </div>
        </>
    )
}

export default Register;