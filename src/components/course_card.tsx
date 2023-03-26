import { Box, Card, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

export interface CourseCardProps {
  courseCode: string;
  major: string;
  courseName: string;
  lecturer: string;
  thumbnail?: string;
  bgColor?: string;
  majorColor?: string;
  courseNameColor?: string;
  lecturerColor?: string;
  href: string;
}

export default function CourseCard({
  courseCode,
  major,
  courseName,
  lecturer,
  thumbnail,
  bgColor,
  majorColor,
  courseNameColor,
  lecturerColor,
  href,
}: CourseCardProps) {
  return (
    <Link href={href} passHref>
      <Card
        p={{ base: 3, lg: 4 }}
        borderRadius={{ base: 'lg', lg: '2xl' }}
        bg={bgColor}
        boxShadow="lg"
      >
        <Image
          alt="Course Thumbnail"
          src={thumbnail ?? 'https://via.placeholder.com/150x100'}
          borderRadius="inherit"
        />
        <Box mt={{ base: 2, lg: 5 }} mb={2}>
          <Text
            fontSize="xs"
            color={majorColor}
          >{`${courseCode} | ${major}`}</Text>
          <Text
            fontSize={{ base: 'lg', lg: 'xl' }}
            fontWeight="bold"
            my={{ lg: 2 }}
            color={courseNameColor}
            isTruncated
          >
            {courseName}
          </Text>
          <Text fontSize="sm" color={lecturerColor}>
            Lecturer: {lecturer}
          </Text>
        </Box>
      </Card>
    </Link>
  );
}
