import Modal from '@/components/modal';
import { Course } from '@/types/course';
import { Major } from '@/types/major';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';

export interface EditCourseModalProps {
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

export default function EditCourseModal({
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
}: EditCourseModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      header="Ubah Detail Course"
    >
      <Stack>
        <FormControl isRequired>
          <FormLabel>Course Name</FormLabel>
          <Input name="name" onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Major</FormLabel>
          <Select>
            {majors.map((m: Major) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Lecturer</FormLabel>
          <Input
            name="lecturer"
            onChange={(e) => setLecturer(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Course Code</FormLabel>
          <Input
            name="code"
            onChange={(e) => setAbbreviation(e.target.value)}
          />
        </FormControl>
      </Stack>
    </Modal>
  );
}
