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
  id: string;
  setId: (id: string) => void;
  name: string;
  setName: (name: string) => void;
  majors: Major[];
  majabbr: string;
  setMajabbr: (majabbr: string) => void;
  abbreviation: string;
  setAbbreviation: (abbreviation: string) => void;
  description: string;
  setDescription: (description: string) => void;
  lecturer: string;
  setLecturer: (lecturer: string) => void;
}

export default function AddCourseModal({
  isOpen,
  onClose,
  handleConfirm,
  id,
  setId,
  name,
  setName,
  majors,
  majabbr,
  setMajabbr,
  abbreviation,
  setAbbreviation,
  description,
  setDescription,
  lecturer,
  setLecturer,
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
          {/* IFXXXX */}
          <FormLabel>Course Code</FormLabel>
          <Input
            name="id"
            placeholder="XXYYYY"
            onChange={(e) => setId(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Course Name</FormLabel>
          <Input name="name" onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Abbreviation</FormLabel>
          <Input
            name="abbreviation"
            onChange={(e) => setAbbreviation(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Major</FormLabel>
          <Select name="majabbr" onChange={(e) => setMajabbr(e.target.value)}>
            {majors.map((m: Major) => (
              <option key={m.abbreviation} value={m.abbreviation}>
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
        <FormControl>
          <FormLabel>Lecturer</FormLabel>
          <Input
            name="lecturer"
            onChange={(e) => setLecturer(e.target.value)}
          />
        </FormControl>
      </Stack>
    </Modal>
  );
}
