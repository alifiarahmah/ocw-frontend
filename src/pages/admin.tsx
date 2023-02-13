import Layout from '@/components/layout'
import Modal from '@/components/modal'
import { User } from '@/types/user'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import RowAction from '../components/admin/row-action'

// TODO: fetch data from API
const dummy: User[] = [
  {
    username: 'bayu',
    name: 'Bayu',
    email: 'bayu@bayu.id',
    role: 'admin',
    isActivated: true,
  },
  {
    username: 'seorangalip',
    name: 'Alip',
    email: 'alip@alip.id',
    role: 'contributor',
    isActivated: true,
  },
  {
    username: 'mahasiswarandom',
    name: 'Mahasiswa Univ Random',
    email: 'mahasiswa@unran.ac.id',
    role: 'member',
    isActivated: true,
  },
]

export default function Admin() {
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure()
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()
  const toast = useToast()
  const [users, setUsers] = useState<User[]>(dummy)
  const [selectedUser, setSelectedUser] = useState<User>(dummy[0])
  // for input form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('member')

  const handleEditButton = (user: User) => {
    setSelectedUser(user)
    onOpenEdit()
  }

  const handleDeleteButton = (user: User) => {
    setSelectedUser(user)
    onOpenDelete()
  }

  const handleAdd = (user: User) => {
    // TODO: change to use API
    setUsers([
      ...users,
      { name, email, role, username: name.toLowerCase(), isActivated: false },
    ])
    toast({
      title: `Pengguna ${name} berhasil ditambahkan.`,
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
    onCloseAdd()
  }

  const handleEdit = (user: User) => {
    // TODO: change to use API
    toast({
      title: `Data pengguna ${name} berhasil diubah.`,
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
    onCloseEdit()
  }

  const handleDelete = (user: User) => {
    // TODO: change to use API
    toast({
      title: `Pengguna ${name} berhasil dihapus.`,
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
    onCloseDelete()
  }

  return (
    <>
      <Layout
        px={{ base: 5, md: 20 }}
        py={{ base: 5, md: 10 }}
        title="Admin Page"
      >
        <HStack justifyContent="space-between">
          <Heading>Daftar Pengguna</Heading>
          <Button bg="biru.600" color="white" onClick={onOpenAdd}>
            <MdAdd />
            <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
              Tambah Pengguna
            </Text>
          </Button>
        </HStack>
        <TableContainer>
          <Table variant="simple" bg={'white'} borderRadius="lg" mt={5}>
            <Thead textTransform="capitalize">
              <Tr>
                <Th>Nama</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((u: User) => (
                <Tr key={u.username}>
                  <Td>{u.name}</Td>
                  <Td>{u.email}</Td>
                  <Td>{u.role}</Td>
                  <Td>
                    <RowAction
                      onOpenEdit={() => handleEditButton(u)}
                      onOpenDelete={() => handleDeleteButton(u)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Layout>

      <Modal
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        onConfirm={() => handleAdd(selectedUser)}
        header="Tambah Pengguna"
      >
        <Stack>
          <FormControl isRequired>
            <FormLabel>Nama</FormLabel>
            <Input
              name="name"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              placeholder="john@doe.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Role</FormLabel>
            <Select name="role" onChange={(e) => setRole(e.target.value)}>
              <option value="member">Member</option>
              <option value="contributor">Contributor</option>
              <option value="admin">Admin</option>
            </Select>
          </FormControl>
        </Stack>
      </Modal>

      <Modal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        onConfirm={() => handleEdit(selectedUser)}
        header="Ubah Data Pengguna"
      >
        <Stack>
          <FormControl isRequired>
            <FormLabel>Nama</FormLabel>
            <Input
              name="name"
              placeholder="John Doe"
              value={selectedUser.name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              placeholder="john@doe.com"
              value={selectedUser.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={selectedUser.role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="member">Member</option>
              <option value="contributor">Contributor</option>
              <option value="admin">Admin</option>
            </Select>
          </FormControl>
        </Stack>
      </Modal>

      <Modal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onConfirm={() => handleDelete(selectedUser)}
        header="Hapus Pengguna"
      >
        <Text>Apakah anda yakin ingin menghapus pengguna ini?</Text>
      </Modal>
    </>
  )
}
