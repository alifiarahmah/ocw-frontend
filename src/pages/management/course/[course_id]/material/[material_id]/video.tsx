import CourseBanner from '@/components/course_banner';
import NotFound from '@/components/not_found';
import Layout from '@/components/layout';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  Container,
  useToast,
  Text,
} from '@chakra-ui/react';
import { MdArrowBackIos } from 'react-icons/md';
import React, { FC, ReactElement, useState, useEffect } from 'react';
import http from '@/lib/http';
import { getAvailableUserData } from '@/lib/token';
import { useRouter } from 'next/router';
import { UserClaim } from '@/types/token';
import { stringify } from 'querystring';

interface CourseBannerProps {
  course_code : string;
  course_name : string;
  lecturer : string;
};

interface GetContentProps {
  status : number;
  course_code : string | null;
  course_name : string | null;
  lecturer : string | null;
  material_code : string | null;
}

const EditContentPage = ({
  status,
  course_code,
  course_name,
  lecturer,
  material_code
} : GetContentProps) : ReactElement => {
  const toast = useToast();
  const courseBannerProps : CourseBannerProps = {
    course_code: course_code!,
    course_name: course_name!,
    lecturer: lecturer!,
  };
  const [title, setTitle] = useState<string>('');
  const [downloadable, setDownloadable] = useState<boolean>(true);
  const [contentPath, setContentPath] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = (e : any) => {
    e.preventDefault();
    setIsLoading(true);
    const content = {
      link: contentPath,
      type: "video"
    }
    http
      .post(`${process.env.NEXT_PUBLIC_API_URL}/material/${material_code}`, content)
      .then(
        res => {
          //pass
          toast({
            title: 'Adding material success!',
            description: res.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }, res => {
          console.log(res);
          toast({
            title: 'Adding material failed!',
            description: res.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      ).finally(() => {setIsLoading(false);});
  };
  return (
    <Layout title="Edit Content" py={0} px={0}>
      <CourseBanner {...courseBannerProps}>
        <Stack
          justifyContent="space-between"
          direction={{ base: 'column-reverse', lg: 'row' }}
          gap={3}
        >
          <Stack direction="row">
            <IconButton
              aria-label="back"
              icon={<MdArrowBackIos />}
              variant="ghost"
            />
            <Heading size="lg" mt={10} mb={5} as="h1">
              Decision Tree Learning (DTL)
            </Heading>
          </Stack>
        </Stack>
        <Card mt={10}>
          <CardHeader>
            <Heading size="md" className="center">
              Menambah Video Materi
            </Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Judul Handout</FormLabel>
                <Input value={title} onChange={e => setTitle(e.target.value)}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Downloadable</FormLabel>
                <Select onChange={e => setDownloadable(e.target.value === 'yes')}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Link Youtube</FormLabel>
                <Input value={contentPath} onChange={e => setContentPath(e.target.value)} />
              </FormControl>
              <Container height={30} />
              <Button type="submit" backgroundColor="blue.400">
                Tambah
              </Button>
            </form>
          </CardBody>
        </Card>
      </CourseBanner>
    </Layout>
  );
}

const EditContent = () => {
  const router = useRouter();
  const query = router.query;
  const course_id = query.course_id;
  const material_id = query.material_id;

  const [data, setData] = useState<GetContentProps>({
    status: 200,
    course_code : null,
    course_name : null,
    lecturer : null,
    material_code : null
  });

  useEffect(()=>{
    if(!router.isReady) return;

    if(course_id && material_id){

      const getContent = async (course_id : string, material_id : string) => {
        let res : GetContentProps = {
          status: 200,
          course_code : null,
          course_name : null,
          lecturer : null,
          material_code : null
        };
        const course = await http.get(`${process.env.NEXT_PUBLIC_API_URL}/course/${course_id}`);
      
        if(course.status != 200){
          res.status = 404;
          setData(res);
          return;
        }
      
        res.course_code = course.data.data.id;
        res.course_name = course.data.data.name;
        res.lecturer = course.data.data.lecturer;
      
        let user : UserClaim | null = getAvailableUserData();
        if(!user || (user.role != "admin" && user.email != course.data.data.email)){
          res.status = 403;
          setData(res);
          return;
        }
      
        /*
        const material = await http.get(`${process.env.NEXT_PUBLIC_API_URL}/material/${material_id}`);
        if(material.status != 200 || material.data.data.course_code != course_id){
          res.status = 404;
          return res;
        }*/
      
        res.material_code = material_id;
        setData(res);
      }

      getContent(course_id as string, material_id as string)
        .catch(
          res => {
            setData({
              ...data,
              status: 404,
            });
          }
        );
    } else {
      setData({
        ...data,
        status: 404,
      });
    }
  },[router.isReady]);

  console.log(data);
  if(data.status != 200){
    return <NotFound />;
  }

  return <EditContentPage {...data}/>;
}

export default EditContent;