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

export interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  type: string;
  setType: (name: string) => void;
  link: string;
  setLink: (link: string) => void;
  file: File | undefined;
  setFile: (file: File | undefined) => void;
}

const AddContentModal = ({
  isOpen,
  onClose,
  handleConfirm,
  type,
  setType,
  link,
  setLink,
  file,
  setFile,
}: AddContentModalProps) => {
  const uploadToClient = (e: any) => {
    if(e.target.files && e.target.files[0]){
      const i = e.target.files[0];

      setFile(i);
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      header="Menambahkan Materi Baru"
    >
      <Stack>
        <FormControl isRequired>
          <FormLabel>Tipe Materi</FormLabel>
          <Select onChange={(e) => {setType(e.target.value)}}>
            <option value="video">Video</option>
            <option value="handout">File</option>
          </Select>
        </FormControl>
        {
          type == 'video' ?(
            <FormControl>
              <FormLabel>Link</FormLabel>
              <Input
                name="Link"
                onChange={(e) => setLink(e.target.value)}
              />
            </FormControl>
          ) : (
            <FormControl>
              <FormLabel>File</FormLabel>
              <Input
                name="File"
                type="file"
                onChange={(e) => uploadToClient(e)}
              />
            </FormControl>
          )
        }
      </Stack>
    </Modal>
  );
}

export default AddContentModal;