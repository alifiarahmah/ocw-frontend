import Modal from '@/components/modal';
import { Text } from '@chakra-ui/react';

export interface DeleteMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
}

export default function DeleteMaterialModal({
  isOpen,
  onClose,
  handleConfirm,
}: DeleteMaterialModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      header="Hapus Materi"
    >
      <Text>Apakah anda yakin ingin menghapus materi ini?</Text>
    </Modal>
  );
}
