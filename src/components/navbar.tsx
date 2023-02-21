import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { MdMenu, MdOutlineArrowDropDown } from 'react-icons/md'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  return (
    <>
      <HStack
        as="nav"
        py={5}
        px={3}
        justifyContent="space-between"
        bg="biru.600"
        color="white"
        boxShadow={{ base: 'none', md: 'md' }}
      >
        <HStack>
          <Heading as="h6" size="md">
            ITBOpenCourseWare
          </Heading>
        </HStack>
        <IconButton
          variant="unstyled"
          aria-label="Menu"
          icon={<MdMenu size="2rem" />}
          display={{ base: 'block', md: 'none' }}
          onClick={onOpen}
        />
        <HStack display={{ base: 'none', md: 'flex' }}>
          <Menu>
            <MenuButton>
              <HStack>
                <Avatar size="sm" />
                <Text>Admin</Text>
                <MdOutlineArrowDropDown />
              </HStack>
            </MenuButton>
            <MenuList color="black">
              <MenuItem onClick={() => router.push('/login')}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>

      {/* Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody mt={7}>
            <Heading as="h6" size="md">
              ITBOpenCourseWare
            </Heading>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
