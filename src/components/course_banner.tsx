import {
  HStack,
  VStack,
  Box,
  Container,
  Text,
  Divider,
  BoxProps,
  Skeleton
} from '@chakra-ui/react';

export interface BannerProps extends BoxProps {
  bg?: string;
  course_code: string;
  course_name: string;
  lecturer: string;
  children?: React.ReactNode;
}

const CourseBanner: React.FC<BannerProps> = ({
  bg,
  children,
  course_code,
  course_name,
  lecturer,
  ...props
}) => {
  return (
    <HStack height="100%" alignItems="stretch">
      <Box
        mt={0}
        px={props.p ?? props.px ?? { base: 5, md: 20 }}
        py={props.p ?? props.py ?? { base: 5, md: 10 }}
        width="100%"
        {...props}
      >
        {children}
      </Box>
      <Container minHeight="90vh" bgColor="biru.500" width="50vh" padding={10}>
        <VStack align={'start'} spacing="6" marginStart="2vh" maxWidth="30vh">
          <VStack spacing="1" align={'start'}>
            <Text align={'start'} fontSize={'m'}>
              Kode Mata Kuliah
            </Text>
            <Skeleton isLoaded={course_code.length > 0}>
              <Text align={'start'} fontSize={'xl'} wordBreak="break-word">
                {course_code}
              </Text>
            </Skeleton>
          </VStack>
          <Divider borderColor={'black'} borderWidth={'1px'} w="75%" my={4} />
          <VStack spacing="1" align={'start'}>
            <Text align={'start'} fontSize={'m'}>
              Mata Kuliah
            </Text>
            <Skeleton isLoaded={course_name.length > 0}>
              <Text align={'start'} fontSize={'xl'} wordBreak="break-word">
                {course_name}
              </Text>
            </Skeleton>
          </VStack>
          <Divider borderColor={'black'} borderWidth={'1px'} w="75%" my={4} />
          <VStack spacing="1" align={'start'}>
            <Text align={'start'} fontSize={'m'}>
              Dosen Pengajar
            </Text>
            <Skeleton isLoaded={lecturer.length > 0}>
              <Text align={'start'} fontSize={'xl'} wordBreak="break-word">
                {lecturer}
              </Text>
            </Skeleton>
          </VStack>
        </VStack>
      </Container>
    </HStack>
  );
};

export default CourseBanner;
