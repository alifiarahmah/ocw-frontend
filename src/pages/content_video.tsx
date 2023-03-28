import styles from '@/styles/verifcation.module.css';
import { Container, Text, HStack, Button } from '@chakra-ui/react';
import Layout from '@/components/layout';
import { useState } from 'react';
import CourseBanner from '@/components/course_banner';
import { Center } from '@chakra-ui/react';

export default function contentVideo() {
  const [courseBannerProps, setCourseBannerProps] = useState({
    course_code: 'IF3270',
    course_name: 'Pembelajaran Mesin',
    lecturer: 'Dr. Nur Ulfa Maulidevi, ST, M.Sc.',
  });
  return (
    <Layout title="Content Layout" py={0} px={0}>
      <CourseBanner {...courseBannerProps}>
        
          <HStack spacing={'30px'}>
            <Button
              _hover={{ color: 'darkgrey', opacity: '100%' }}
              background={'transparent'}
              fontSize={'6xl'}
            >
            ←</Button>
            <Text fontSize={'3xl'}>Decision Tree Learning (DTL)</Text>
          </HStack>
        <Center flexDirection={'column'}>

          <Container
            // marginStart={'10vw'}
            maxWidth={'5xl'}
            maxHeight={'7xl'}
            className={styles.containercontent}
          >
            <iframe 
            width="100%" height="100%" 
            src="https://youtube.com/embed/zBUe2ma_14A" 
            title="video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>

          </Container>
          
        </Center>
      </CourseBanner>
    </Layout>
  );
}
