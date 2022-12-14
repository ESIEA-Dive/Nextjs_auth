import NextLink from "next/link";
import { Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

// define the page component
function Navbar() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (session)
    return (
      <Flex justifyContent="flex-end" p={6} bg='teal'>
        <NextLink href={"/"}>
          <Text fontWeight={600} marginInline={5} color="white" fontSize={20}>Courses</Text>
        </NextLink>

        <NextLink href={"/profile"}>
          <Text fontWeight={600} marginInline={5} color="white" fontSize={20}>Profile</Text>
        </NextLink>


        <Text fontWeight={600} marginInline={5} color="darkred" fontSize={20} onClick={onOpen} _hover={{cursor: "pointer"}}>Logout</Text>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Logout ?</ModalHeader>
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
