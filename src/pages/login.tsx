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
import styles from '@/styles/Login.module.css';

const Login = () => {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className={styles.background}>
                <Container className={styles.container}>
                    <Center>Login</Center>
                    <FormControl isRequired>
                        <FormLabel>Alamat Email</FormLabel>
                        <Input placeholder='Alamat Email'></Input>
                        <Container style={{height: 1}}/>
                        <FormLabel>Kata Sandi</FormLabel>
                        <Input placeholder='Kata Sandi' type='password'></Input>
                    </FormControl>
                    <Button className={styles.button} backgroundColor='#0d4c92' color='white'>Masuk</Button>
                    <Center>Tidak punya akun? <a className={styles.register} href='./register'>Daftar sekarang!</a></Center>
                </Container>
            </div>
        </>
    )
}

export default Login;