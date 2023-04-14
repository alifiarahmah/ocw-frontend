import Layout from '@/components/layout'
import { Image, Center, Text, Stack, Img } from '@chakra-ui/react'
import Link from 'next/link'

export default function FourOhFour() {
  return (
    <>
      <Layout>
				<Center>
					<Stack direction={'column'}>
						<Image src="@/asset/error.png" boxSize={100} align={'center'}/>
						<Text fontWeight={700} fontSize={48} align={'center'}>404</Text>
						<Text fontWeight={600} fontSize={24} align={'center'}>Page Not Found</Text>
					</Stack>
				</Center>

      </Layout>
    </>);
}