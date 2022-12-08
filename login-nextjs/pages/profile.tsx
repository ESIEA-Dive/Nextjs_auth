import { Heading, Text, Container, Center, VStack, HStack, Image, Button, Input } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { EditIcon, CheckIcon} from "@chakra-ui/icons";
import { useBoolean } from '@chakra-ui/react';
import React, { useState } from 'react';


const profile = () => {
  const { data: session } = useSession();
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [valueName, setValueName] = useState(session?.user?.name ? session?.user?.name : undefined);
  const handleChangeName = (event: any) => setValueName(event.target.value);
  const [valueEmail, setValueEmail] = useState(session?.user?.email ? session?.user?.email : undefined);
  const handleChangeEmail = (event: any) => setValueEmail(event.target.value);
  


  return (

    <Container mt={4}>
      <Center>
        <VStack>
          <Heading>Profile</Heading>
          <Image
            src={
              session?.user?.image ||
              'https://images.pexels.com/photos/13243820/pexels-photo-13243820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }
            alt='picture'
            boxSize="200px"
            borderRadius="full"
            mx="auto"
            border="1px solid black"
          />
          <Button colorScheme='teal' size='md'>
            Change picture
          </Button>
          <Text color="gray" fontSize={30}>Name</Text>
          <HStack spacing='24px'>
            {!editName && (<Text color="teal" fontSize={15}>{valueName}</Text>)}
            {editName && (<Input value={valueName} onChange={handleChangeName} variant="flushed" placeholder="New name" size="sm" />)}
            {!editName &&(<Button onClick={() => { setEditName(true) }} leftIcon={<EditIcon />} colorScheme='teal' variant='solid'>Edit</Button>)}
            {editName &&(<Button onClick={() => { setEditName(false) }} leftIcon={<CheckIcon />} colorScheme='teal' variant='solid'>Valider</Button>)}
          </HStack>
          <Text color="gray" fontSize={30}>Email</Text>
          <HStack spacing='24px'>
            {!editEmail && (<Text color="teal" fontSize={15}>{valueEmail}</Text>)}
            {editEmail && (<Input value={valueEmail} onChange={handleChangeEmail} variant="flushed" placeholder="New email" size="sm" />)}
            {!editEmail &&(<Button onClick={() => { setEditEmail(true) }} leftIcon={<EditIcon />} colorScheme='teal' variant='solid'>Edit</Button>)}
            {editEmail &&(<Button onClick={() => { setEditEmail(false) }} leftIcon={<CheckIcon />} colorScheme='teal' variant='solid'>Valider</Button>)}
          </HStack>
        </VStack>
      </Center>
    </Container>

  );
};

export default profile;