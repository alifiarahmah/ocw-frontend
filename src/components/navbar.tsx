import { getAvailableUserData, unsetToken } from '@/lib/token';
import { routes } from '@/routes';
import { UserClaim } from '@/types/token';
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdMenu, MdOutlineArrowDropDown } from 'react-icons/md';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [user, setUser] = useState<UserClaim | null>(null);

  useEffect(() => {
    const userData = getAvailableUserData();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    unsetToken();
    router.push('/login');
  };

  return (
    <>
      <HStack
        as="nav"
        h="10vh"
        py={5}
        px={7}
        justifyContent="space-between"
        bg="biru.600"
        color="white"
        boxShadow={{ base: 'none', md: 'md' }}
      >
        <Link href="/">
          <HStack gap={2}>
            <Image
              alt="logo"
              src="https://seeklogo.com/images/I/institut-teknologi-bandung-logo-7B8F816823-seeklogo.com.png"
              height="2.5rem"
            />
            <Heading as="h6" size="md">
              ITBOpenCourseWare
            </Heading>
          </HStack>
        </Link>
        <IconButton
          variant="unstyled"
          aria-label="Menu"
          icon={<MdMenu size="2rem" />}
          display={{ base: 'block', md: 'none' }}
          onClick={onOpen}
        />
        <HStack display={{ base: 'none', md: 'flex' }}>
          {user ? (
            <Menu>
              <MenuButton>
                <HStack>
                  <Avatar size="sm" />
                  <Text>{user.name}</Text>
                  <MdOutlineArrowDropDown />
                </HStack>
              </MenuButton>
              <MenuList color="black">
                {user.role === 'admin' && (
                  <MenuItem>
                    <Link href="/admin">Admin Panel</Link>
                  </MenuItem>
                )}
                {user.role !== 'student' && (
                  <MenuItem>
                    <Link href="/management/course">Course Management</Link>
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link href="/login">
              <Text>Login</Text>
            </Link>
          )}
        </HStack>
      </HStack>

      {/* Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody mt={7}>
            <Heading as="h6" size="md" my={5}>
              ITBOpenCourseWare
            </Heading>
            {routes.map((route) => (
              <Link key={route.name} href={route.path}>
                <Text as="a" display="block" align="center" py={5}>
                  {route.name}
                </Text>
              </Link>
            ))}
            {user && user.role === 'admin' && (
              <Link href="/admin">
                <Text as="a" display="block" align="center" py={5}>
                  Admin Panel
                </Text>
              </Link>
            )}
            {user && user.role !== 'student' && (
              <Link href="/management/course">
                <Text as="a" display="block" align="center" py={5}>
                  Course Management
                </Text>
              </Link>
            )}
          </DrawerBody>

          <DrawerFooter>
            {user ? (
              <Button width="100%" onClick={handleLogout}>
                Log out
              </Button>
            ) : (
              <Stack justifyContent="stretch" width="100%">
                <Button as={Link} href="/register" bg="biru.600" color="white">
                  Register
                </Button>
                <Button as={Link} href="/login">
                  Login
                </Button>
              </Stack>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
