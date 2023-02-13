import { Button, HStack, Text } from '@chakra-ui/react'
import { MdDelete, MdEdit } from 'react-icons/md'

interface RowActionProps {
  onOpenEdit: () => void
  onOpenDelete: () => void
}

export default function RowAction({
  onOpenEdit,
  onOpenDelete,
}: RowActionProps) {
  return (
    <HStack>
      <Button size="sm" colorScheme="yellow" onClick={onOpenEdit}>
        <MdEdit />
        <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
          Ubah
        </Text>
      </Button>
      <Button size="sm" colorScheme="red" onClick={onOpenDelete}>
        <MdDelete />
        <Text ml={2} display={{ base: 'none', lg: 'flex' }}>
          Hapus
        </Text>
      </Button>
    </HStack>
  )
}
