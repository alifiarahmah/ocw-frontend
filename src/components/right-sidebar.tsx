import { Text, VStack, Divider, position } from "@chakra-ui/react"


const RightSidebar = ({title}:{title:string} ) => {
    return (
      <div>
        <div style={{
          bottom: 0,
          right: 0,
          top:80,
          width: '30vh',
          height: '93vh',
          backgroundColor: '#a0e4cb',
          padding: '20px',
          position:'absolute'
        }}>
          <VStack align={'start'} spacing='6' marginStart='2vh' maxWidth="30vh">
            <VStack spacing='1' align={'start'}>
                <Text align={'start'} fontSize={'m'}>Kode Mata Kuliah</Text>
                <Text align={'start'} fontSize={'xl'} wordBreak="break-word">IF2240</Text>
            </VStack>
            <Divider borderColor={'black'} borderWidth={"1px"} w='75%' my={4} style={{marginLeft: "0vh"}}/>
            <VStack spacing='1' align={'start'}>
                <Text align={'start'} fontSize={'m'}>Mata Kuliah</Text>
                <Text align={'start'} fontSize={'xl'} wordBreak="break-word">Pembelajaran Mesin</Text>
            </VStack>
            <Divider borderColor={'black'} borderWidth={"1px"} w='75%' my={4} style={{marginLeft: "0vh"}}/>
            <VStack spacing='1' align={'start'}>
                <Text align={'start'} fontSize={'m'}>Dosen Pengajar</Text>
                <Text align={'start'} fontSize={'xl'} wordBreak="break-word">Dr. Nur Ulva Maulidevi, ST, M.Sc</Text>
            </VStack>
          </VStack>
        </div>
      </div>
    )

  }
  
  export default RightSidebar
  