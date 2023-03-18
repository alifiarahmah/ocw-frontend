import styles from '@/styles/verifcation.module.css'
import {Container, Text, HStack, Button} from '@chakra-ui/react'
import Layout from '@/components/layout'
import RightSidebar from '@/components/right-sidebar'

export default function contentVideo(){
    return(
        <Layout title ="Content Layout">
            <RightSidebar kodeMataKuliah={'IF2240'} mataKuliah={'Pembelajaran Mesin'} dosenPengajar={'Dr. Nur Ulva Maulidevi, ST, M.Sc'}/>            
            <HStack spacing={'300px'}>
                <Button _hover={{color: "darkgrey", opacity:'100%'}}    background={'transparent'} fontSize={'6xl'} left={'27vh'}> ← </Button>
                <Text fontSize={'3xl'} >Decision Tree Learning (DTL)</Text>
            </HStack> 
            <Container marginStart={'27vh'}  maxWidth={'5xl'} maxHeight={'7xl'} className = {styles.containercontent}>
            <iframe 
            width="100%" height="100%" 
            src="https://www.youtube.com/embed/t-wFKNy0MZQ" 
            title="video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
            </Container>
        </Layout>    
    );
}