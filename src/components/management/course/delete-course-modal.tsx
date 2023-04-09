import Modal from '@/components/modal';
import { Text } from '@chakra-ui/react';

export interface DeleteCourseModalProps {
	isOpen: boolean;
	onClose: () => void;
	handleConfirm: () => void;
}

export default function DeleteCourseModal({
  isOpen,
  onClose,
  handleConfirm,
}: DeleteCourseModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      header="Hapus Course"
    >
      <Text>Apakah anda yakin ingin menghapus course ini?</Text>
    </Modal>
  );
}
