import styles from '@/styles/verifcation.module.css';
import { Container, Text, HStack, Button, VStack, useToast } from '@chakra-ui/react';
import Layout from '@/components/layout';
import { useState, useEffect } from 'react';
import CourseBanner from '@/components/course_banner';
import { Center } from '@chakra-ui/react';
import http from '@/lib/http';
import { useRouter } from 'next/router';

export default function ContentVideo() {
  const [courseBannerProps, setCourseBannerProps] = useState({
    course_code: 'IF3270',
    course_name: 'Pembelajaran Mesin',
    lecturer: 'Dr. Nur Ulfa Maulidevi, ST, M.Sc.',
  });
  const toast = useToast();
  const[links, setLinks] = useState<string[]>([]);
  const router = useRouter();
  const query = router.query;
  const id = query.id;

  useEffect(() => {
    

    http.get(`${process.env.NEXT_PUBLIC_API_URL}/material/${id}`)
    .then((res) => {
    const material_url : string[] = [];
    console.log(res);
    res.data.data.contents.forEach((content) => {
      if (content.type == 'video'){
        material_url.push(content.link)
      }
    }); 
    setLinks(material_url);
    const course_id = res.data.data.course_id
    http.get(`${process.env.NEXT_PUBLIC_API_URL}/course/${course_id}`)
    .then((red) => {
      setCourseBannerProps({
        course_code : red.data.data.id,
        course_name : red.data.data.name,
        lecturer : red.data.data.lecturer,
      });
    })
    .catch((err) => {
      toast({
        title: 'Gagal mengambil data Course.',
        description : err.message,
        status: 'error',
        duration : 9000,
        isClosable: true,
    });
    });
  })
    .catch((err) => {
      toast({
        title: 'Gagal mengambil data konten.',
        description : err.message,
        status: 'error',
        duration : 9000,
        isClosable: true,
      });
    });
  },[router.query.id]);
 
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
          <VStack maxHeight={'fit-content'} width={'100%'}>
          {
            links.map((url, idx) => (
              <Container
                maxWidth={'5xl'}
                maxHeight={'7xl'}
                className={styles.containercontent}
                key={idx}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={url.replace("watch?v=","embed/")}
                  title="video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </Container>
            ))
          }
          </VStack>
        </Center>
      </CourseBanner>
    </Layout>
  );
}
