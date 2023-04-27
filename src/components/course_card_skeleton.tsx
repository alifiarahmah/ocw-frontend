import { Box, Card, Skeleton, SkeletonText } from '@chakra-ui/react';

export default function CourseCardSkeleton() {
  return (
    <Card
      p={{ base: 3, lg: 4 }}
      borderRadius={{ base: 'lg', lg: '2xl' }}
      boxShadow="lg"
    >
      <Skeleton w="150px" h="100px" />
      <Box mt={{ base: 2, lg: 5 }} mb={2}>
        <SkeletonText noOfLines={1} size="xs" />
        <SkeletonText
          noOfLines={1}
          size={{ base: 'lg', lg: 'xl' }}
          my={{ lg: 2 }}
        />
        <SkeletonText noOfLines={1} size="sm" />
      </Box>
    </Card>
  );
}
