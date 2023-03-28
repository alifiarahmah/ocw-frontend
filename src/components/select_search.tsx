import http from '@/lib/http';
import { Faculty } from '@/types/faculty';
import { Major } from '@/types/major';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdOutlineArrowDropDown, MdSearch } from 'react-icons/md';

export function SelectSearch() {
  const [majors, setMajors] = useState<Major[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  useEffect(() => {
    try {
      const getMajors = async () => {
        const res = await http.get('/course/major');
        setMajors(res.data.data);
      };
      getMajors();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      const getFaculty = async () => {
        const res = await http.get('/course/faculty');
        setFaculty(res.data.data);
      };
      getFaculty();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Flex justifyContent="center">
      <Menu>
        <MenuButton>
          <InputGroup borderRadius={20} w={{ lg: '50rem' }}>
            <InputLeftElement>
              <MdSearch />
            </InputLeftElement>
            <Input
              name="search"
              placeholder="Cari Fakultas atau Jurusan"
              bg="white"
            />
            <InputRightElement>
              <MdOutlineArrowDropDown />
            </InputRightElement>
          </InputGroup>
        </MenuButton>
        <MenuList>
          {/* TODO: list all major and faculty */}
          {faculty.map((faculty: Faculty) => (
            <Link href={`/courses/faculty/${faculty.id}`} key={faculty.id}>
              <MenuItem display="flex" w="50rem">
                {faculty.name}
              </MenuItem>
            </Link>
          ))}
          {majors.map((major: Major) => (
            <Link href={`/courses/major/${major.id}`} key={major.id}>
              <MenuItem display="flex" w="50rem">
                {major.name}
              </MenuItem>
            </Link>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}
