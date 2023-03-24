import http from "@/http";
import { Major } from "@/types/major";
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
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineArrowDropDown, MdSearch } from "react-icons/md";

export function SelectSearch() {
  const [majors, setMajors] = useState<Major[]>([]);

  useEffect(() => {
    try {
      const getMajors = async () => {
        const res = await http.get("/course/major");
        setMajors(res.data.data);
      };
      getMajors();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Flex justifyContent="center">
      <Menu>
        <MenuButton>
          <InputGroup borderRadius={20} w={{ lg: "50rem" }}>
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
          {majors.map((major: Major) => (
            <Link href={`/courses/${major.ID}`} key={major.ID}>
              <MenuItem display="flex" w="50rem">
                {major.Name}
              </MenuItem>
            </Link>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}
