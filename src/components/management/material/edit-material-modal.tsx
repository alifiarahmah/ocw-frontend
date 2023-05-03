import Modal from '@/components/modal';
import http from '@/lib/http';
import { Major } from '@/types/major';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  TableContainer,
	Table,
	Thead,
	Tbody,
  Text,
	Tr,
	Th,
	Td,
	Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';

export interface EditMaterialModalProps {
	materialID: string;
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  name: string;
  week: number;
	contents: Content[];
}

export interface Content {
	id : string,
	type : string
}

const EditMaterialModal = ({
	materialID,
  isOpen,
  onClose,
  handleConfirm,
  name,
  week,
	contents
}: EditMaterialModalProps) => {
	console.log(contents);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      header="Menambahkan Materi Baru"
    >
      <Stack>
        <FormControl isRequired>
          <FormLabel>Judul Materi</FormLabel>
          <Input 
						variant="filled" 
						name="name" 
						value={name}
						isDisabled 
					/>
        </FormControl>
        <FormControl>
          <FormLabel>Week</FormLabel>
          <Input
            name="Week"
            type="number"
            variant="filled"
						value={week}
            isDisabled
          />
        </FormControl>
				<Button>
					<Text>
						Add Content
					</Text>
				</Button>
				{
					contents.length > 0 ? (
						<TableContainer>
							<Table variant="simple" bg="white" borderRadius={'lg'} mt={5}>
								<Thead textTransform="capitalize">
									<Tr>
										<Th>Content Type</Th>
										<Th>Action</Th>
									</Tr>
								</Thead>
								<Tbody>
									{contents.map((m: Content) => (
										<Tr key={m.id}>
											<Td>{m.type}</Td>
											<Td>
												<Button size="sm" colorScheme="red">
      									  <MdDelete />
      									  <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
      									    Hapus
      									  </Text>
      									</Button>
											</Td>
										</Tr>
									))
									}
								</Tbody>
							</Table>
						</TableContainer>
					) : (
						<Text>No Content</Text>
					)
				}
      </Stack>
    </Modal>
  );
}

export default EditMaterialModal;