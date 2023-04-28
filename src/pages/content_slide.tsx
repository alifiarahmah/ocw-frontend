import styles from '@/styles/verifcation.module.css';
import Layout from '@/components/layout';
import { useState } from 'react';
import { Text, HStack, Button, Container, Center } from '@chakra-ui/react';
import CourseBanner from '@/components/course_banner';

export default function ContentSlide() {
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
            ←
          </Button>
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
              src="/static/testing.pdf"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </Container>
        </Center>
      </CourseBanner>
    </Layout>
  );
}
