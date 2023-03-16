import styles from '@/styles/verifcation.module.css'
import { ChakraProvider, Container } from '@chakra-ui/react'
import '@fontsource/merriweather'
import '@fontsource/poppins'
import Layout from '@/components/layout'
import RightSidebar from '@/components/right-sidebar'
import { Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import {HStack, VStack} from '@chakra-ui/react'

export default function contentSlide(){
    return(
        <Layout title ="Content Layout">
            <RightSidebar title = "Rightsidebar content slide"/>            
            <HStack spacing={'300px'}>
                <Button _hover={{color: "darkgrey", opacity:'100%'}}    background={'transparent'} fontSize={'6xl'} left={'27vh'}> ← </Button>
                <Text fontSize={'3xl'} >Decision Tree Learning (DTL)</Text>
            </HStack> 
            <Container marginStart={'27vh'}  maxWidth={'5xl'} maxHeight={'7xl'} className = {styles.containercontent}>
            <iframe
                src="/static/testing.pdf"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />
            </Container>
        </Layout>    
    );
}