import type { NextPage } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { Input, Flex, Button, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure, VStack, Center, HStack, Select, Textarea } from "@chakra-ui/react";
import { Flex, Button, Text, Heading, InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";
import { SearchIcon } from '@chakra-ui/icons'

// Define Prop Interface
interface ShowProps {
  user: any
  url: string
}

function Home(props: ShowProps) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [valueTitle, setValueTitle] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [valueDuration, setValueDuration] = useState("");
  const [valuePrice, setValuePrice] = useState(0);
  const [valueDescription, setValueDescription] = useState("");
  const [valuePillar, setValuePillar] = useState("");
  const [valuePlaces, setValuePlaces] = useState(0);

  const createClass = async() => {
    const newClass = [{
      userId:session?.user?.id, 
      title:valueTitle,
      date:valueDate,
      duration: valueDuration,
      price: valuePrice,
      description: valueDescription,
      pillar: valuePillar,
      teacher: session?.user?.name,
      places: valuePlaces
    }]
    const res = await fetch(props.url + "class/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClass),
    })
    console.log(res)
  }

  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Heading>Classes</Heading>
      {session ? (
        <>
          <Text>
            Signed in as {session?.user?.email} <br />
          </Text>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <>
          <Flex direction="column" alignItems="center" justifyContent="center">
            Not signed in <br />
            <Button onClick={() => signIn()}>Sign in</Button>
          </Flex>
        </>
      )}

      <Button onClick={onOpen} mt={10} colorScheme='teal' size='md'>Add classes</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new class</ModalHeader>
            <VStack>
              <HStack>
                <Text text-align='left' fontSize={15}>Title</Text>
                <Input onChange={(e: any) => setValueTitle(e.target.value)} value={valueTitle} placeholder="Title" size="sm"/>
              </HStack>
              <HStack>
                <Text text-align='left' fontSize={15}>Date and time</Text>
                <Input onChange={(e: any) => setValueDate(e.target.value)} value={valueDate} placeholder="Date and time" size="sm" type="datetime-local"/>
              </HStack>
              <HStack>
                <Text text-align='left' fontSize={15}>Duration</Text>
                <Input onChange={(e: any) => setValueDuration(e.target.value)} value={valueDuration} placeholder="Duration" size="sm" type="time"></Input>
              </HStack>
              <HStack>
                <Text text-align='left' fontSize={15}>Price</Text>
                <Input onChange={(e: any) => setValuePrice(e.target.value)} value={valuePrice} placeholder="Price" size="sm" type="number"/>
              </HStack>
              <HStack>
                <Text text-align='left' fontSize={15}>Description</Text>
                <Textarea onChange={(e: any) => setValueDescription(e.target.value)} value={valueDescription} placeholder="Description" size="sm"/>
              </HStack>
              <HStack>
                <Text text-align='left' fontSize={15}>Pillar</Text>
                <Select onChange={(e: any) => setValuePillar(e.target.value)} value={valuePillar} size="sm">
                    <option>Emotional</option>
                    <option>Physical</option>
                    <option>Mental</option>
                    <option>Spiritual</option>
                    <option>Social</option>
                    <option>Environmental</option>
                    <option>Financial</option>
                    <option>Occupational</option>
                  </Select>
              </HStack>
              <HStack>
                <Text text-align='left' fontSize={15}>Places available</Text>
                <Input onChange={(e: any) => setValuePlaces(e.target.value)} value={valuePlaces} placeholder="Places available" size="sm" type="number"/>
              </HStack>
            </VStack>
          <ModalCloseButton />
          <ModalFooter>
            
            <Button colorScheme='teal' mr={4} onClick={() => { createClass(); onClose(); }}>
              Validate
            </Button>
            <Button variant='ghost' onClick={onClose} >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Heading mt={10}>Classes</Heading>
      <InputGroup size='md' width={500} mt={10}>
        <Input
          pr='4.5rem'
          type='text'
          placeholder='Search for a class'
        />
        <InputRightElement>
        <Button onClick={() => { null }} rightIcon={<SearchIcon />} color='teal' pl={2} variant='solid'></Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default Home;


export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session?.user) {
    const result = await fetch(process.env.API_URL + "users/" + session?.user?.id);
    const user = await result.json();
    if (!user.filledForm)
      return {
        redirect: {
          permanent: false,
          destination: "/form",
        },
        props: {},
      }
    else {
      return {
        props: {
          user: user,
          url: process.env.API_URL
        }
      }
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/auth",
    },
    props: {},
  }
}