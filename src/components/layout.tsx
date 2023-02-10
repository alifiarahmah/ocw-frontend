import { Box, Flex } from '@chakra-ui/react'
import Navbar from './navbar'

export interface LayoutProps {
  bg?: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ bg, children }) => {
  return (
    <Flex direction="column" minH="100vh" bg={bg ?? 'biru.100'}>
      <Navbar />
      <Box p={3}>{children}</Box>
    </Flex>
  )
}

export default Layout
