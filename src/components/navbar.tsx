import {
  Avatar,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { MdOutlineArrowDropDown } from 'react-icons/md'

export default function Navbar() {
  return (
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
      <HStack>
        <Menu>
          <MenuButton>
            <HStack>
              <Avatar size="sm" />
              <Text>Admin</Text>
              <MdOutlineArrowDropDown />
            </HStack>
          </MenuButton>
          <MenuList color="black">
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  )
}
