import { Box, BoxProps, Flex } from '@chakra-ui/react'
import Navbar from './navbar'

export interface LayoutProps extends BoxProps {
  bg?: string
  children: React.ReactNode
}
// with extends BoxProps, we can pass any props that Box can accept
// example: <Layout p={10}>

const Layout: React.FC<LayoutProps> = ({ bg, children, ...props }) => {
  return (
    <Flex direction="column" minH="100vh" bg={bg ?? 'biru.100'}>
      <Navbar />
      <Box
        px={props.p ?? props.px ?? { base: 5, md: 20 }}
        py={props.p ?? props.py ?? { base: 5, md: 10 }}
        {...props}
      >
        {children}
      </Box>
    </Flex>
  )
}

export default Layout
