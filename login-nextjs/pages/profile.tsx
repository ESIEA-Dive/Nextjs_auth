import { useState } from "react"
import { Input, Heading, Text, Container, Center, VStack, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Image, HStack } from "@chakra-ui/react";
import { useSession, getSession } from "next-auth/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";

const pictos = [
    {
        url: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
    },
    {
        url: 'https://cdn-icons-png.flaticon.com/512/4333/4333609.png',
    },
    {
        url: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png',
    },
    {
        url: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
    },
    {
        url: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png',
    },
    {
        url: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png',
    },
    {
        url: 'https://cdn-icons-png.flaticon.com/512/4140/4140061.png',
    },
    {
        url: 'https://cdn-icons-png.flaticon.com/512/4139/4139981.png',
    }
]

// Define Prop Interface
interface ShowProps {
    user: any
    url: string
}

function Show(props: ShowProps) {

    const { data: session } = useSession();
    const [user, setUser] = useState(props.user);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imgIndex, setImgIndex] = useState(0);
    const [pictoSelected, setPictoSelected] = useState(user.image || session?.user?.image || pictos[0].url);
    const [userPicture, setUserPicture] = useState(user.image || session?.user?.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png');

    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [valueName, setValueName] = useState(user.name || session?.user?.name || "name");
    const [valueEmail, setValueEmail] = useState(user.email || session?.user?.email || "email");
    const handleChangeName = (event: any) => setValueName(event.target.value);
    const handleChangeEmail = (event: any) => setValueEmail(event.target.value);

    const updatePicture = async () => {
        setUserPicture(pictoSelected)
        const newUser = { ...user, image: pictoSelected }
        await fetch(props.url + "users/" + user._id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        setUser(newUser)
    }

    const updateEmail = async () => {
        const newUser = { ...user, email: valueEmail ? valueEmail : user.email }
        await fetch(props.url + "users/" + user._id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        setUser(newUser)
    }

    const updateName = async () => {
        const newUser = { ...user, name: valueName ? valueName : user.name }
        await fetch(props.url + "users/" + user._id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        setUser(newUser)
    }

    return (
        <Container>
            <Center>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Select a picture</ModalHeader>
                        <HStack mx="auto" flexWrap={"wrap"} justifyContent="center">
                            {pictos.map((picto, index) => (<Image
                                key={index}
                                src={picto.url}
                                alt='picto'
                                boxSize="100px"
                                borderRadius="full"
                                border={index === imgIndex ? "3px solid teal" : ""}
                                onClick={() => { setImgIndex(index); setPictoSelected(picto.url); }}
                                cursor="pointer"
                                mt={5}
                                mb={5}
                                objectFit='cover'
                            />))}
                        </HStack>
                        <ModalCloseButton />
                        <ModalFooter>
                            <Image
                                src={pictoSelected}
                                alt='picto'
                                boxSize="30px"
                                borderRadius="full"
                                border="1px solid teal"
                                marginBlock={4}
                                mr={4}
                                objectFit='cover'
                            />
                            <Button colorScheme='teal' mr={4} onClick={() => { updatePicture(); onClose(); }}>
                                Validate
                            </Button>
                            <Button variant='ghost' onClick={onClose} >
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <VStack>
                    <Heading>Profile</Heading>
                    <Image
                        src={userPicture}
                        alt='picture'
                        boxSize="200px"
                        borderRadius="full"
                        mx="auto"
                        objectFit='cover'
                    />
                    <Button onClick={onOpen} colorScheme='teal' size='md'>
                        Change picture
                    </Button>
                    <Text color="gray" fontSize={30}>Name</Text>
                    <HStack spacing='24px'>
                        {!editName && (<Text color="teal" fontSize={15}>{valueName}</Text>)}
                        {editName && (<Input value={valueName} onChange={handleChangeName} variant="flushed" placeholder="New name" size="sm" />)}
                        {!editName && (<Button onClick={() => { setEditName(true) }} leftIcon={<EditIcon />} colorScheme='teal' variant='solid'>Edit</Button>)}
                        {editName && (<Button onClick={() => { setEditName(false); updateName(); }} leftIcon={<CheckIcon />} colorScheme='teal' variant='solid'>Valider</Button>)}
                    </HStack>
                    <Text color="gray" fontSize={30}>Email</Text>
                    <HStack spacing='24px'>
                        {!editEmail && (<Text color="teal" fontSize={15}>{valueEmail}</Text>)}
                        {editEmail && (<Input value={valueEmail} onChange={handleChangeEmail} variant="flushed" placeholder="New email" size="sm" />)}
                        {!editEmail && (<Button onClick={() => { setEditEmail(true) }} leftIcon={<EditIcon />} colorScheme='teal' variant='solid'>Edit</Button>)}
                        {editEmail && (<Button onClick={() => { setEditEmail(false); updateEmail(); }} leftIcon={<CheckIcon />} colorScheme='teal' variant='solid'>Valider</Button>)}
                    </HStack>
                </VStack>
            </Center>
        </Container>
    )
}

export default Show

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const res = await fetch(process.env.API_URL + "users/" + session?.user?.id)
    const user = await res.json()

    //return the serverSideProps the todo and the url from out env variables for frontend api calls
    return {
        props: {
            user: user,
            url: process.env.API_URL
        }
    }
}