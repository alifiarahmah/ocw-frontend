import { Button, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { MdAttachFile, MdPlayArrow } from 'react-icons/md';

interface RowActionProps {
  videoLink?: string;
  handoutLink?: string;
}

export default function RowAction({ videoLink, handoutLink }: RowActionProps) {
  return (
    <HStack>
      {videoLink && (
        <Link href={videoLink}>
          <Button size="sm" colorScheme="yellow">
            <MdPlayArrow />
            <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
              Video
            </Text>
          </Button>
        </Link>
      )}
      {handoutLink && (
        <Link href={handoutLink}>
          <Button size="sm" colorScheme="red">
            <MdAttachFile />
            <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
              Handout
            </Text>
          </Button>
        </Link>
      )}
    </HStack>
  );
}
