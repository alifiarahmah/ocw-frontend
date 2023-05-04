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
  IconButton,
  VStack,
  Skeleton,
  AspectRatio,
} from "@chakra-ui/react";
import { MdAdd, MdDelete, MdArrowBackIos } from "react-icons/md";
import AddContentModal from "@/components/management/content/add-content-modal";
import DeleteContentModal from "@/components/management/content/delete-content-modal";
import { Material } from "@/types/material";
import { Content } from "@/types/content";
import axios from "axios";


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
  const [type, setType] = useState<string>('handout');
  const [link, setLink] = useState<string>('');
  const [contentID, setContentID] = useState<string>('');
  const [indexExpanded, setIndexExpanded] = useState<number>(-1);

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
      link : (type === "handout") ? "" : link,
      type : type
    }
    http
      .post(`/material/${material_id}/content`,body).then((res) => {
        if(type === "video"){
          toast({
            title: 'Success',
            description: 'Berhasil menambah materi',
            status: 'success',
            duration: 1000,
            isClosable: true,
          });
          setMaterialReady(false);
        }else{
          const upload_link = res.data.data.upload_link;
          axios
            .put(upload_link, file, {
              headers: {
                'Content-Type' : file!.type,
                'x-amz-acl' : 'public-read',
              }
            })
            .then(
              res => {
                console.log(res);
                toast({
                  title: 'Adding material success!',
                  description: res.data.message,
                  status: 'success',
                  duration: 9000,
                  isClosable: true
                });
                setMaterialReady(false);
              }, res => {
                console.log(res);
                toast({
                  title: 'Adding material failed!',
                  description: res.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
              }
            )
        }
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
    if(!contentID){
      toast({
        title: 'Gagal menghapus',
        description: 'Konten belum dipilih',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
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
      err => {
        console.log(err);
        toast({
          title: 'Gagal menghapus materi',
          description: err.message,
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
      <Layout title="Edit Konten" py={0} px={0}>
        <CourseBanner {...courseBannerProps}>
          <HStack justifyContent="space-between">
            <HStack>
              <IconButton
                aria-label="back"
                icon={<MdArrowBackIos />}
                variant="ghost"
                onClick={router.back}
              />
              <VStack alignItems={'flex-start'}>
                <Heading>Edit Konten</Heading>
                <Skeleton isLoaded = {materialReady}>
                  <Text>{material.name} - Week {material.week}</Text>
                </Skeleton>
              </VStack>
            </HStack>
            <Button bg="biru.600" color="white" onClick={onOpenAdd}>
              <MdAdd />
              <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
                New Content
              </Text>
            </Button>
          </HStack>
          <Card mt={10} p={5}>
            <Accordion allowToggle onChange={(idx) => {setIndexExpanded(idx as number)}}>
              {material.contents.map((c: Content) => (
                <AccordionItem key={c.id}>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                      Content {c.type}
                    </Box>
                  </AccordionButton>
                  <AccordionPanel overflow={'auto'} maxH={'fit-content'} width={'100%'}>
                    {
                      //TODO : Tampilin konten di sini
                      c.type == "handout" ? (
                        <AspectRatio
                          height={'100%'}
                          width={'100%'}
                        >
                        <iframe
                          src={`https://ocw-bucket.s3.idcloudhost.com/static/${c.link}`}
                          width="100%"
                          height="100%"
                          style={{ border: 'none' }}
                          
                        />
                        </AspectRatio>
                      ):(
                        <AspectRatio
                        maxWidth={'5xl'}
                        maxHeight={'7xl'}
                        >
                        <iframe
                          width="100%"
                          height="100%"
                          src={c.link.replace("watch?v=","embed/")}
                          title="video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          />
                        </AspectRatio>
                      )
                    }
                    <Button bg="red" color="white" onClick={e => handleDeleteButton(c.id)} mt={5}>
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