import { useState } from "react"
import { Input, Heading, Text, Container, Center, VStack, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Image, HStack, Divider, Flex, Select, Icon } from "@chakra-ui/react";
import { useSession, getSession } from "next-auth/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import { ImFilePicture } from "react-icons/im";

const pictos = [
    {
        url: 'https://cdn-icons-png.flaticon.com/512/4139/4139993.png',
    },
    {
        url: 'https://cdn-icons-png.flaticon.com/128/4139/4139951.png',
    },
    {
        url: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png',
    },
    {
        url: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
    },
    {
        url: 'https://cdn-icons-png.flaticon.com/128/4140/4140040.png',
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

function Profile(props: ShowProps) {

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



    const updatePicture = async () => {
        if (userPicture !== pictoSelected) {
            setUserPicture(pictoSelected)
            const newUser = { ...user, image: pictoSelected };
            await fetch(props.url + "users/" + user._id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
            setUser(newUser);
        }
    }

    const updateEmail = async () => {
        if (user.email !== valueEmail) {
            const newUser = { ...user, email: valueEmail ? valueEmail : user.email };
            await fetch(props.url + "users/" + user._id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
            setUser(newUser);
        }
    }

    const updateName = async () => {
        if (user.name !== valueName) {
            const newUser = { ...user, name: valueName ? valueName : user.name };
            await fetch(props.url + "users/" + user._id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
            setUser(newUser);
        }
    }

    return (
        <Container>
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
                <HStack spacing={5} style={{
                    width: '100vh',
                    marginInline: '5vh',

                }}>
                    <VStack style={{
                        width: '35%',
                        alignItems: 'center'
                    }}>
                        <Image
                            src={userPicture}
                            alt='picture'
                            boxSize="200px"
                            borderRadius="full"
                            mx="auto"
                            objectFit='cover'
                            mt={5}
                        />
                        <Button leftIcon={<Icon as={ImFilePicture} style={{width: '20px', height:'20px'}}/>} onClick={onOpen} colorScheme='teal' size='md'>
                            Change picture
                        </Button>
                        <Text color="black" fontWeight='500' fontSize={24}>{user.status}</Text>
                        <Text color="gray" fontSize={18}>University</Text>
                    </VStack>
                    <Flex justifyContent='left' style={{
                        width: '65%',
                        alignItems: 'left',
                        marginLeft: '5%',
                        border: '1px solid #D3D3D3',
                        borderRadius: '8px', 
                        backgroundColor: '#f3f5f5',
                        flexDirection: 'column',
                        paddingLeft: '8px'
                    }}>
                    <HStack spacing='24px' style={{
                            marginTop: '15px',
                            
                        }}>
                            <Text color="gray" fontSize={18} fontWeight='500'>Name</Text>
                            {!editName && (<Text color="teal" fontSize={15}>{valueName}</Text>)}
                            {editName && (<Input value={valueName} onChange={(e: any) => setValueName(e.target.value)} variant="flushed" color='black' focusBorderColor='teal.500' placeholder="New name" size="sm" />)}
                            {!editName && (<Button onClick={() => { setEditName(true) }} leftIcon={<EditIcon />} colorScheme='teal' variant='solid' size='xs'>Edit</Button>)}
                            {editName && (<Button onClick={() => { setEditName(false); updateName(); }} leftIcon={<CheckIcon />} colorScheme='teal' variant='solid' paddingInline={6} size='xs'>Valider</Button>)}
                        </HStack>
                        <HStack spacing='24px' style={{
                            marginTop: '15px',
                            
                        }}>
                            <Text color="gray" fontSize={18} fontWeight='500'>Email</Text>
                            {!editEmail && (<Text color="teal" fontSize={15}>{valueEmail}</Text>)}
                            {editEmail && (<Input value={valueEmail} onChange={(e: any) => setValueEmail(e.target.value)} variant="flushed" color='black' focusBorderColor='teal.500' placeholder="New email" size="sm" />)}
                            {!editEmail && (<Button onClick={() => { setEditEmail(true) }} leftIcon={<EditIcon />} colorScheme='teal' variant='solid' size='xs'>Edit</Button>)}
                            {editEmail && (<Button onClick={() => { setEditEmail(false); updateEmail(); }} leftIcon={<CheckIcon />} colorScheme='teal' variant='solid' paddingInline={6} size='xs'>Valider</Button>)}
                        </HStack>
                        <HStack spacing='24px' style={{
                            marginTop: '15px',
                            marginBottom: '15px'
                        }}>
                            <Text color="gray" fontSize={18} fontWeight='500'>Nationality</Text>
                            <Select fontSize={15} color='teal' borderWidth={1} borderColor='gray' borderRadius='7px' focusBorderColor='teal.500' size='xs' width='30%'>
                                <option>French</option>
                                <option>American</option>
                                <option>Russian</option>
                                <option>Spanish</option>
                                <option>Italian</option>
                                <option>Morrocan</option>
                                <option>Mexican</option>
                                <option>English</option>
                                <option>Finnish</option>
                                <option>Swedish</option>
                                <option>German</option>
                                <option>Australian</option>
                                <option>Chinese</option>
                                <option>Japanese</option>
                                <option>Corean</option>
                            </Select>
                        </HStack>
                    </Flex>
                </HStack>
            </VStack>
        </Container>
    )
}

export default Profile

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const res = await fetch(process.env.API_URL + "users/" + session?.user?.id);
    const user = await res.json()
    if (session?.user) {
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