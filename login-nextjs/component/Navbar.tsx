import NextLink from "next/link";
import { Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

// define the page component
function Navbar() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (session)
    return (
      <Flex justifyContent="space-around" p={10} bg='teal'>
        <NextLink href={"/"}>
          <Button>Courses</Button>
        </NextLink>

        <NextLink href={"/profile"}>
          <Button>Profile</Button>
        </NextLink>

        <Button onClick={onOpen} bg='darkred' color='white' _hover={{ backgroundColor: 'black', color: 'white' }}>Sign out</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure you want to logout ?</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Button colorScheme='teal' mr={4} onClick={() => { signOut(); onClose(); }}>
                Yes
              </Button>
              <Button variant='ghost' onClick={onClose} >
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </Flex>
    );
  else {
    return null;
  }
};

export default Navbar;
