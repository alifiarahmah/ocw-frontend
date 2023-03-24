/* eslint-disable react-hooks/exhaustive-deps */
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
import axios from 'axios'
import { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import RowAction from '../components/admin/row-action'

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
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User>({
    CreatedAt: '',
    Email: '',
    IsActivated: false,
    Name: '',
    Password: '',
    Role: '',
    UpdatedAt: '',
  })
  // for input form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('member')

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/user`).then((res) => {
      setUsers(res.data.data)
      setSelectedUser(res.data[0])
    }).catch((err) => {
      toast({
        title: 'Gagal mengambil data pengguna.',
        description: err.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    })
  }, [])

  const handleEditButton = (user: User) => {
    setSelectedUser(user)
    setName(user.Name)
    setEmail(user.Email)
    setRole(user.Role)
    onOpenEdit()
  }

  const handleDeleteButton = (user: User) => {
    setSelectedUser(user)
    onOpenDelete()
  }

  const handleAdd = () => {
    // TODO: change to use API
    setUsers([
      ...users,
      {
        CreatedAt: '',
        Email: email,
        IsActivated: false,
        Name: name,
        Password: '',
        Role: role,
        UpdatedAt: '',
      },
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
    setUsers(
      users.map((u) => {
        if (u.Email === user.Email) {
          return {
            ...u,
            Name: name,
            Email: email,
            Role: role,
          }
        }
        return u
      })
    )
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
    setUsers(users.filter((u) => u.Email !== user.Email))
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
                <Tr key={u.Email}>
                  <Td>{u.Name}</Td>
                  <Td>{u.Email}</Td>
                  <Td>{u.Role}</Td>
                  <Td>
                    <RowAction
                      onOpenEdit={() => {
                        handleEditButton(u)}
                      }
                      onOpenDelete={() => {
                        handleDeleteButton(u)}
                      }
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
        onConfirm={() => handleAdd()}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              placeholder="john@doe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={role}
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
