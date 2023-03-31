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

export interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  majors: Major[];
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  lecturer: string;
  setLecturer: (lecturer: string) => void;
  abbreviation: string;
  setAbbreviation: (abbreviation: string) => void;
  selectedMajorId: string;
  setSelectedMajorId: (selectedMajorId: string) => void;
}

export default function AddCourseModal({
  isOpen,
  onClose,
  handleConfirm,
  majors,
  name,
  setName,
  description,
  setDescription,
  lecturer,
  setLecturer,
  abbreviation,
  setAbbreviation,
  selectedMajorId,
  setSelectedMajorId,
}: AddCourseModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      header="Menambahkan Course Baru"
    >
      <Stack>
        <FormControl isRequired>
          <FormLabel>Course Name</FormLabel>
          <Input name="name" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Abbreviation</FormLabel>
          <Input name="abbreviation" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Major</FormLabel>
          <Select name="majabbr">
            {majors.map((m: Major) => (
              <option key={m.abbreviation} value={m.abbreviation}>
                {m.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" />
        </FormControl>
        <FormControl>
          <FormLabel>Lecturer</FormLabel>
          <Input name="lecturer" />
        </FormControl>
        <FormControl isRequired>
          {/* IFXXXX */}
          <FormLabel>Course Code</FormLabel>
          <Input name="id" placeholder="XXYYYY" />
        </FormControl>
      </Stack>
    </Modal>
  );
}
