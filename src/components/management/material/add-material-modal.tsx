import Modal from '@/components/modal';
import { Major } from '@/types/major';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';

export interface AddMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  name: string;
  setName: (name: string) => void;
  week: number;
  setWeek: (week: number) => void;
}

const AddMaterialModal = ({
  isOpen,
  onClose,
  handleConfirm,
  name,
  setName,
  week,
  setWeek
}: AddMaterialModalProps) => {
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
          <Input name="name" onChange={(e) => setName(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>Week</FormLabel>
          <Input
            name="Week"
            type="number"
            onChange={(e) => setWeek(+e.target.value)}
          />
        </FormControl>
      </Stack>
    </Modal>
  );
}

export default AddMaterialModal;