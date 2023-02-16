import Head from 'next/head';
import {
    Container,
    Center,
    Text, 
    Button,
}from '@chakra-ui/react';
import styles from '@/styles/verifcation.module.css';
import { Poppins, Merriweather } from '@next/font/google';
import Image from 'next/image';
import emailpic from '../asset/email.png';



const poppins = Poppins({weight:"100", subsets:['latin'],})


const merriweather = Merriweather({weight:"300", subsets:['latin'],})


export default function Home(){
    return(
        <>
            <Head>
                <title>
                    Account Verification
                </title>
        
            </Head>  
            <div className={styles.background}>
                <Container className={styles.container}>
                    <a className={styles.h1}>
        
                    <Text fontSize='4xl' className={merriweather.className}><strong> <span className={styles.boldtext}> Selamat Datang!</span> </strong>  </Text>
                    </a>
                    <a className={styles.h2}>
                    <Text className={poppins.className }>
                        <strong>  Kami tidak sabar untuk menemani Anda belajar. Sebelum mulai, Anda harus melakukan verifikasi email terlebih dahulu dengan <span className={styles.boldtext}> menekan tombol di bawah  </span></strong>
                    </Text>
                    </a>
                    <Image
                        src = {emailpic}
                        alt = "verification icon"
                        placeholder='blur'
                        className={styles.images}
                    />
                    
                    <Button size={'4xl'} textColor={'black'} colorScheme='cyan' rounded={'2xl'} className={styles.button}>Verifikasi E-mail</Button>
                </Container>
            </div>
        </>
    )
}
