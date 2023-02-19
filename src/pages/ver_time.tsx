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
import Layout from '@/components/layout';
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import { Flex } from '@chakra-ui/react';
import {
    StatLabel,
    StatNumber,
    Spacer,
    Stat
} from "@chakra-ui/react";
import { useState } from 'react';


const poppins = Poppins({weight:"100", subsets:['latin'],})


const merriweather = Merriweather({weight:"300", subsets:['latin'],})


export default function ver_time(){
    const [timeInSec, setTime] = useState(1800);
    return(
        <>
            <Head>
                <title>
                    Account Verification
                </title>
        
            </Head>  
            <Layout>
                <div className={styles.background}>
                    <Container className={styles.container}>
                        <a className={styles.h1}>
            
                        <Text fontSize='2xl' className={merriweather.className}><strong> <span className={styles.boldtext}> Pranala verifikasi telah dikirim melalui e-mail!</span> </strong>  </Text>
                        </a>
                        <a className={styles.h2}>
                        <Text fontSize='l' className={poppins.className }>
                            <strong>  Silakan periksa e-mail Anda. Apabila tidak ditemukan, periksa pada bagian spam <span className={styles.boldtext}></span></strong>
                        </Text>
                        </a>
                        <Image
                            src = {emailpic}
                            alt = "verification icon"
                            placeholder='blur'
                            className={styles.images}
                        />
                        <a className={styles.h1}>
            
                        <Text fontSize='2xl' className={merriweather.className}><strong> <span className={styles.boldtext}> waktu tersisa: </span> </strong>  </Text>
                        </a>
                
                        {/* <CountdownCircleTimer className={styles.button}
                            isPlaying
                            duration={300}
                            colors={[
                                {0: '#004777'},
                                {1: '#F7B801'},
                                {2:'#A30000'}
                            ]} 
                            
                        >
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer> */}
                        <Stat placeSelf={"center"}>
                            <Flex
                                position={"relative"}
                                direction={"column"}
                            >
                                <StatLabel
                                    fontSize={"lg"}
                                    placeSelf={"center"}
                                >
                                    Time Remaining:
                                </StatLabel>
                                <StatNumber
                                    fontSize={"9xl"}
                                    placeSelf={"center"}
                                >
                                    {(~~(timeInSec / 60))
                                        .toString()
                                        .padStart(2, "0")}
                                    :
                                    {(timeInSec % 60)
                                        .toString()
                                        .padStart(2, "0")}
                                </StatNumber>
                                {timeInSec <= 3 ? (
                                    <Text
                                        bottom={0}
                                        position={"absolute"}
                                        color={"red.500"}
                                        placeSelf={"center"}
                                    >
                                        You will be redirected shortly.
                                    </Text>
                                ) : (
                                    <Spacer />
                                )}
                            </Flex>
                        </Stat>


                    </Container>
                </div>     
            </Layout>
        </>
    )
}
