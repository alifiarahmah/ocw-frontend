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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Card,
} from "@chakra-ui/react";
import { MdAdd, MdDelete } from "react-icons/md";
import AddContentModal from "@/components/management/content/add-content-modal";
import DeleteContentModal from "@/components/management/content/delete-content-modal";
import { Material } from "@/types/material";
import { Content } from "@/types/content";

interface CourseBannerProps {
  course_code : string;
  course_name : string;
  lecturer : string;
}

const ContentManagementPage = () => {
  const router = useRouter();
  const query = router.query;
  const course_id = query.course_id;
  const material_id = query.material_id;
  
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

  const [material, setMaterial] = useState<Material>({
    id: '',
    course_id: '',
    creator_email: '',
    name: '',
    week: 0,
    contents: []
  });
  const [isValid, setIsValid] = useState<boolean>(true);
  const [file, setFile] = useState<File|undefined>();
  const [type, setType] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [contentID, setContentID] = useState<string>('');

  useEffect(() => {
    if(!router.isReady) return;
    if(course_id && material_id){
      let user : UserClaim | null = getAvailableUserData();
      const getCourse = async(course_id : string) => {
        const course = await http
          .get(`/course/${course_id}`)
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
            description: "Pengguna bukan contributor",
            status: 'error',
            duration: 9000,
            isClosable: true
          });
          setIsValid(false);
        }
      }

      const getMaterial = async (material_id : string, course_id : string) => {
        const material = await http.get(`/material/${material_id}`).catch(
					(err) => {
						toast({
              title: 'Get Course Failed',
              description: err.data.message,
              status: 'error',
              duration: 9000,
              isClosable: true
            });
						setIsValid(false);
					}
				);
				
				if(material){
					if(material!.data.data.course_id != course_id){
						toast({
							title: 'Wrong Material or Course',
							description: material.data.message,
							status: 'error',
							duration: 9000,
							isClosable: true
						});
						setIsValid(false);
					}
				}
      }

      getCourse(course_id as string)
				.then((res) => {getMaterial(material_id as string, course_id as string)
					.catch((err) => {throw err})})
        .catch((err) => {setIsValid(false)});
    }
	  
  }, [isValid, router.isReady]);

  const [materialReady, setMaterialReady] = useState<boolean>(false);
  useEffect(() => {
    if(!router.isReady) return;

    if(material_id){
      http
        .get(`/material/${material_id}`)
        .then((res) => {
          const material = res.data.data;
          setMaterial(material);
          setMaterialReady(true);
        }).catch((err) => {
          toast({
            title: 'Error',
            description: 'Gagal mengambil data materi',
            status: 'error'
          })
        })
    }
  }, [materialReady, router.isReady]);

  const handleAdd = () => {
    const body = {
      type : type,
      link : (type === "handout") ? "" : link,
    }
    http
      .post(`/material/${material_id}`,body).then((res) => {
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

  const handleDeleteButton = (content_id : string) => {
    setContentID(content_id);
    onOpenDelete();
  }

  const handleDelete = () => {
    http.delete(`/material/${material_id}/content/${contentID}`).then(
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
            <Heading>Edit Konten</Heading>
            <Button bg="biru.600" color="white" onClick={onOpenAdd}>
              <MdAdd />
              <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
                New Content
              </Text>
            </Button>
          </HStack>
          <Card mt={10}>
            <Accordion>
              {material.contents.map((c: Content) => (
                <AccordionItem key={c.id}>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                      Content {c.id}
                    </Box>
                  </AccordionButton>
                  <AccordionPanel>
                    {
                      //TODO : Tampilin konten di sini
                    }
                    <Button bg="red" color="white" onClick={onOpenDelete}>
                      <MdDelete />
                      <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
                        Delete
                      </Text>
                    </Button>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </CourseBanner>
      </Layout>

      <AddContentModal
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        handleConfirm={() => {handleAdd()}}
        type={type}
        setType={setType}
        link={link}
        setLink={setLink}
        file={file}
        setFile={setFile}
      />

      <DeleteContentModal
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

export default ContentManagementPage;