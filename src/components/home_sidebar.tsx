import { routes } from '@/routes';
import { Box, Flex, Stack, StackProps, Text } from '@chakra-ui/react';
import Link from 'next/link';

export interface HomeSidebarProps extends StackProps {
  currentPath?: string;
}

function HomeSidebar({ currentPath = '/', ...props }: HomeSidebarProps) {
  console.log(currentPath);
  return (
    <Stack bg="teal.400" gap={0} display={{ base: 'none', lg: 'flex' }}>
      {/* TODO: make loop */}
      {routes.map((r) => (
        <Link href={r.path} key={r.path}>
          <Flex
            width="20vw"
            pl="30%"
            py={5}
            justifyContent="space-between"
            color="white"
            bg={currentPath === r.path ? 'teal.500' : 'teal.400'}
            _hover={{ bg: 'teal.300', color: 'black' }}
          >
            <Flex alignItems="center">
              {r.icon}
              <Text ml={3} fontSize="xl">
                {r.name}
              </Text>
            </Flex>
            <Box display={currentPath === r.path ? 'block' : 'none'} mr={-1}>
              <svg
                width="20"
                height="43"
                viewBox="0 0 20 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.129604 21.516L32.5229 0.455236L32.2984 42.9181L0.129604 21.516Z"
                  fill="#CFF5E7"
                />
              </svg>
            </Box>
          </Flex>
        </Link>
      ))}
    </Stack>
  );
}

export default HomeSidebar;
