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
  MenuOptionGroup,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdOutlineArrowDropDown, MdSearch } from 'react-icons/md';

export function SelectSearch() {
  const [majors, setMajors] = useState<Major[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  useEffect(() => {
    http
      .get('/course/major')
      .then((res) => {
        setMajors(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    http
      .get('/course/faculty')
      .then((res) => {
        setFaculty(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <MenuOptionGroup title="Fakultas">
            {faculty.map((faculty: Faculty) => (
              <Link href={`/courses/faculty/${faculty.id}`} key={faculty.id}>
                <MenuItem display="flex" w="50rem">
                  {faculty.abbreviation} - {faculty.name}
                </MenuItem>
              </Link>
            ))}
          </MenuOptionGroup>
          <MenuOptionGroup title="Jurusan">
            {majors.map((major: Major) => (
              <Link href={`/courses/major/${major.id}`} key={major.id}>
                <MenuItem display="flex" w="50rem">
                  {major.abbreviation} - {major.name}
                </MenuItem>
              </Link>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}
