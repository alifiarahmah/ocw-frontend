import { Text, VStack, Divider } from '@chakra-ui/react';

interface RightSidebarProps {
  kodeMataKuliah: string;
  mataKuliah: string;
  dosenPengajar: string;
}
const RightSidebar = ({
  kodeMataKuliah,
  mataKuliah,
  dosenPengajar,
}: RightSidebarProps) => {
  return (
    // <div>
    <div>
      <VStack
        style={{
          bottom: 0,
          right: 0,
          top: 80,
          width: '30vh',
          height: '93vh',
          backgroundColor: '#a0e4cb',
          padding: '20px',
          position: 'absolute',
        }}
        align={'start'}
        spacing="6"
        marginStart="2vh"
        maxWidth="30vh"
      >
        <VStack spacing="1" align={'start'}>
          <Text align={'start'} fontSize={'m'}>
            Kode Mata Kuliah
          </Text>
          <Text align={'start'} fontSize={'xl'} wordBreak="break-word">
            {kodeMataKuliah}
          </Text>
        </VStack>
        <Divider borderColor={'black'} borderWidth={'1px'} w="75%" my={4} />
        <VStack spacing="1" align={'start'}>
          <Text align={'start'} fontSize={'m'}>
            Mata Kuliah
          </Text>
          <Text align={'start'} fontSize={'xl'} wordBreak="break-word">
            {mataKuliah}
          </Text>
        </VStack>
        <Divider borderColor={'black'} borderWidth={'1px'} w="75%" my={4} />
        <VStack spacing="1" align={'start'}>
          <Text align={'start'} fontSize={'m'}>
            Dosen Pengajar
          </Text>
          <Text align={'start'} fontSize={'xl'} wordBreak="break-word">
            {dosenPengajar}
          </Text>
        </VStack>
      </VStack>
    </div>
    // </div>
  );
};
export default RightSidebar;
