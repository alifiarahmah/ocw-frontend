import styles from '@/styles/verifcation.module.css';
import Layout from '@/components/layout';
import RightSidebar from '@/components/right-sidebar';
import { Text, HStack, Button, Container } from '@chakra-ui/react';
export default function contentSlide() {
  return (
    <Layout title="Content Layout">
      <RightSidebar
        kodeMataKuliah={'IF2240'}
        mataKuliah={'Pembelajaran Mesin'}
        dosenPengajar={'Dr. Nur Ulva Maulidevi, ST, M.Sc'}
      />
      <HStack spacing={'300px'}>
        <Button
          _hover={{ color: 'darkgrey', opacity: '100%' }}
          background={'transparent'}
          fontSize={'6xl'}
          left={'27vh'}
        >
          {' '}
          ←{' '}
        </Button>
        <Text fontSize={'3xl'}>Decision Tree Learning (DTL)</Text>
      </HStack>
      <Container
        marginStart={'27vh'}
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
    </Layout>
  );
}
