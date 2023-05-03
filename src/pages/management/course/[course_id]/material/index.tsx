import CourseBanner from "@/components/course_banner";
import Layout from "@/components/layout";
import http from "@/lib/http";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NotFound from "@/components/not_found";
import { UserClaim } from "@/types/token";
import { getAvailableUserData } from "@/lib/token";
import { 
  useToast,
  HStack,
  Heading,
  Button,
  Text,
  useDisclosure,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import AddMaterialModal from "@/components/management/material/add-material-modal";
import DeleteMaterialModal from "@/components/management/material/delete-material-modal";
import RowAction from '@/components/admin/row-action';
import { Material } from "@/types/material";
import { Content } from "@/types/content";

interface CourseBannerProps {
  course_code : string;
  course_name : string;
  lecturer : string;
}

const MaterialManagementPage = () => {
  const router = useRouter();
  const query = router.query;
  const course_id = query.course_id;
  
  const toast = useToast();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete
  } = useDisclosure();
  const [courseBannerProps, setCourseBannerProps] = useState<CourseBannerProps>({
    course_code : '',
    course_name : '',
    lecturer : ''
  });
  const [materialID, setMaterialID] = useState<string>('');
  const [materialName, setMaterialName] = useState<string>('');
  const [materialWeek, setMaterialWeek] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    if(!router.isReady) return;
    console.log("t");
    if(course_id){
      let user : UserClaim | null = getAvailableUserData();
      const getCourse = async(course_id : string) => {
        const course = await http
          .get(`${process.env.NEXT_PUBLIC_API_URL}/course/${course_id}`)
          .catch((res) => {
            toast({
              title: 'Get Course Failed',
              description: res.data.message,
              status: 'error',
              duration: 9000,
              isClosable: true
            });
            setIsValid(false);
          });
        if(user && course!.data.data.email == user!.email){
          setCourseBannerProps({
            course_code : course_id,
            course_name : course!.data.data.name,
            lecturer : course!.data.data.lecturer
          });
        }else{
          toast({
            title: 'Forbidden Page',
            description: "Gaboleh edit course",
            status: 'error',
            duration: 9000,
            isClosable: true
          });
          setIsValid(false);
        }
      }
      getCourse(course_id as string)
        .catch((res) => {setIsValid(false)});
    }
	  
  }, [isValid, router.isReady]);

  const [materialReady, setMaterialReady] = useState<boolean>(false);
  useEffect(() => {
    http
      .get(`/course/${course_id}/materials`)
      .then((res) => {
        setMaterials(res.data.data);
        setMaterialReady(true);
      }).catch((err) => {
        toast({
          title: 'Error',
          description: 'Gagal mengambil data materi',
          status: 'error'
        })
      })
  }, [materialReady]);

  const handleAdd = () => {
    http
      .post(`/course/${course_id}/material`,
        {
          name: materialName,
          week: materialWeek
        }
      ).then((res) => {
        toast({
          title: 'Success',
          description: 'Berhasil menambah materi',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
        setMaterialReady(false);
      }).catch((err) => {
        toast({
          title: 'Gagal menambah material',
          description: `${err.response?.data}`,
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
      });
    onCloseAdd();
  }

  const handleEditButton = (material_id: string) => {
    router.push(`/management/course/${course_id}/material/${material_id}`);
  }

  const handleDeleteButton = (material_id : string) => {
    setMaterialID(material_id);
    onOpenDelete();
  }

  const handleDelete = () => {
    http.delete(`/material/${materialID}`).then(
      (res) => {
        toast({
          title: 'Success',
          description: 'Berhasil menghapus materi.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
        setMaterialReady(false);
      }
    ).catch(
      (res) => {
        toast({
          title: 'Gagal menghapus materi',
          description: 'Entah mengapa',
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      }
    )

    onCloseDelete();
  }
  
  if(isValid) return (
    <>
      <Layout title="Edit Material" py={0} px={0}>
        <CourseBanner {...courseBannerProps}>
          <HStack justifyContent="space-between">
            <Heading>Daftar Materi</Heading>
            <Button bg="biru.600" color="white" onClick={onOpenAdd}>
              <MdAdd />
              <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
                New Material
              </Text>
            </Button>
          </HStack>
          <TableContainer>
          <Table variant="simple" bg={'white'} borderRadius="lg" mt={5}>
            <Thead textTransform="capitalize">
              <Tr>
                <Th>Material</Th>
                <Th>Week</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {materials.map((m: Material) => (
                <Tr key={m.id}>
                  <Td>{m.name}</Td>
                  <Td>{m.week}</Td>
                  <Td>
                    <HStack>
                      <RowAction
                        onOpenEdit={() => {
                          handleEditButton(m.id);
                        }}
                        onOpenDelete={() => {
                          handleDeleteButton(m.id);
                        }}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        </CourseBanner>
      </Layout>

      <AddMaterialModal 
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        handleConfirm={() => handleAdd()}
        name={materialName}
        setName={setMaterialName}
        week={materialWeek}
        setWeek={setMaterialWeek}
      />

      <DeleteMaterialModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleConfirm={() => handleDelete()}
      />
    </>
  )
  else return (
    <Layout title="Not Found">
      <NotFound/>
    </Layout>
  )
}

export default MaterialManagementPage;