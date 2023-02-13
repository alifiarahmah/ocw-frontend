import {
  Button,
  HStack,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react'

interface ModalProps extends ChakraModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  header?: string
  confirmText?: string
  footer?: 'none' | React.ReactNode | React.ReactNode[]
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  header,
  children,
  confirmText = 'Konfirmasi',
  footer,
  ...props
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        {footer != 'none' && (
          <ModalFooter>
            {footer ? (
              footer
            ) : (
              <HStack>
                <Button mr={3} onClick={onClose}>
                  Batalkan
                </Button>
                <Button
                  mr={3}
                  onClick={onConfirm ?? onClose}
                  colorScheme="blue"
                >
                  {confirmText}
                </Button>
              </HStack>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
