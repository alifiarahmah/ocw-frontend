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
import { MdOutlineArrowDropDown, MdSearch } from "react-icons/md";

export function SelectSearch() {
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
          <MenuItem display="flex" w="50rem">
            Sekolah Teknik Elektro dan Informatika
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
