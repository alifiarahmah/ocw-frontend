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
import React, {useState} from 'react';
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState({
        email : '',
        password : '',
    });
    const handleChange = (type: string, e: any) => {
        let updatedValue = {};
        if(type == 'email'){
            updatedValue = {email: e.target.value};
        }else if (type=='password'){
            updatedValue = {password: e.target.value};
        }
        setUser(user => ({...user, ...updatedValue}));
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post('http://localhost:8080/auth/login', user)
            .then((response) => {
                console.log(response.data);
            }, (error) => {
                if(error.response.status === 400 || error.response.status === 403){
                    alert("Username atau password anda salah!");
                }else{
                    alert("Gaboleh -,-");
                }
            });
    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className={styles.background}>
                <Container className={styles.container}>
                    <Center>Login</Center>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Alamat Email</FormLabel>
                            <Input placeholder='Alamat Email' value={user.email} onChange={e => handleChange('email', e)}></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kata Sandi</FormLabel>
                            <Input placeholder='Kata Sandi' value={user.password} type='password' onChange={e => handleChange('password', e)}></Input>
                        </FormControl>
                        <Button className={styles.button} backgroundColor='#0d4c92' color='white' type='submit'>Masuk</Button>
                    </form>
                    <Center>Tidak punya akun? <a className={styles.register} href='./register'>Daftar sekarang!</a></Center>
                </Container>
            </div>
        </>
    )
}

export default Login;