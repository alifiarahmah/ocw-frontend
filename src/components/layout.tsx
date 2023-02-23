import { Box, BoxProps, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Navbar from './navbar'

export interface LayoutProps extends BoxProps {
  bg?: string
  title?: string
  children: React.ReactNode
}
// with extends BoxProps, we can pass any props that Box can accept
// example: <Layout p={10}>

const Layout: React.FC<LayoutProps> = ({ bg, children, title, ...props }) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} | ITBOpenCourseWare` : `ITBOpenCourseWare`}
        </title>
        <meta
          name="description"
          content="Platform pembelajaran kuliah untuk publik yang disediakan oleh Institut Teknologi Bandung."
        />
      </Head>
      <Flex direction="column" minH="100vh" bg={bg ?? "biru.100"}>
        <Navbar />
        <Box
          px={props.p ?? props.px ?? { base: 5, md: 20 }}
          py={props.p ?? props.py ?? { base: 5, md: 10 }}
          {...props}
        >
          {children}
        </Box>
      </Flex>
    </>
  );
}

export default Layout
