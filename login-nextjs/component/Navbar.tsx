import NextLink from "next/link";
import { Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure, Text, VStack, Icon, Avatar } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';

// define the page component
function Navbar() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (session)
    return (
      <Flex justifyContent="flex-end" p={6} bg='white'>
        <NextLink href={"/"}>
          <VStack spacing={0} opacity={0.6} _hover={{ cursor: "pointer", opacity: "1" }} marginInline={5}>
            <Icon
              as={FaChalkboardTeacher}
              style={{
                width: '24px',
                height: '24px',
              }}
            />
            <Text fontWeight={600} marginInline={5} color="black" fontSize={20}>Courses</Text>
          </VStack>
        </NextLink>

        <NextLink href={"/profile"}>
          <VStack spacing={0} opacity={0.6} _hover={{ cursor: "pointer", opacity: "1" }} marginInline={5}>
            <Avatar style={{ width: '24px', height: '24px' }} name={session.user?.name || "default_avatar"} src={session.user?.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
            <Text fontWeight={600} marginInline={5} color="black" fontSize={20}>Profile</Text>
          </VStack>
        </NextLink>


        <VStack onClick={onOpen} spacing={0} opacity={0.6} _hover={{ cursor: "pointer", opacity: "1" }} marginInline={5}>
          <Icon
            as={MdOutlineLogout}
            color='darkred'
            style={{
              width: '24px',
              height: '24px',
            }}
          />
          <Text fontWeight={600} marginInline={5} color="darkred" fontSize={20}>Logout</Text>
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
        </VStack>

      </Flex>
    );
  else {
    return null;
  }
};

export default Navbar;
