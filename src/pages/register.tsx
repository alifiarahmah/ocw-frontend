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
import { useState } from 'react';
import { useRouter } from 'next/router';
import { update } from 'cypress/types/lodash';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter()

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user = {
            "name" : name,
            "email" : email,
            "password" : password,
            "password_validation" : confirmPassword,
        };
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, user)
            .then((response) => {
                alert("Success");
            }, (error) => {
                alert("Terjadi kesalahan dalam registrasi");
            });
    }
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
                                placeholder='Nama'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Alamat Email</FormLabel>
                            <Input 
                                placeholder='Alamat Email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Kata Sandi</FormLabel>
                            <Input 
                                placeholder='Kata Sandi' 
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                            <Input 
                                placeholder='Konfirmasi Kata Sandi' 
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>
                        <Text>Dengan menekan tombol daftar di bawah ini, saya menyetujui Persyaratan Layanan dan Kebijakan Privasi kami.</Text> 
                        <Button className={styles.button} backgroundColor='#0d4c92' color='white' type='submit'>Daftar</Button>
                    </form>
                    <Center>Sudah punya akun? Login sekarang!</Center>
                </Container>
            </div>
        </>
    )
}

export default Register;