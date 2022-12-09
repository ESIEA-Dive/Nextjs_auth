import { User } from "../../lib/types"
import { useRouter } from "next/router"
import { useState } from "react"
import { Heading, Text, Container, Center, VStack, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Image, HStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

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
    user: User
    url: string
}


function Show(props: ShowProps) {

    const router = useRouter()
    const [user, setUser] = useState<User>(props.user[0])
    const { data: session } = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [imgIndex, setImgIndex] = useState(0);
    const [pictoSelected, setPictoSelected] = useState(session?.user?.image || pictos[0].url);
    const [userPicture, setUserPicture] = useState(session?.user?.image || user.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png');

    // function to complete a todo
    const updatePicture = async () => {
        setUserPicture(pictoSelected);
        const newUser = { ...user, image: pictoSelected }
        // make api call to change completed in database
        await fetch(props.url + "users/" + user._id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            // send copy of todo with property
            body: JSON.stringify(newUser),
        })
        setUser(newUser)
    }

    // function for handling clicking the delete button
    /*const handleDelete = async () => {
        await fetch(props.url + "users/" + user._id, {
            method: "delete",
        })
        //push user back to main page after deleting
        router.push("/")
    }*/

    //return JSX
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
                    <Text color="teal" fontWeight={600} fontSize={15}>{session?.user?.name}</Text>
                    <Text color="gray" fontSize={30}>Email</Text>
                    <Text color="teal" fontWeight={600} fontSize={15}>{session?.user?.email}</Text>
                </VStack>
            </Center>
        </Container>
    )
}

// Define Server Side Props
export async function getServerSideProps(context: any) {
    // fetch the todo, the param was received via context.query.id
    const res = await fetch(process.env.API_URL + "users")
    const user = await res.json()

    //return the serverSideProps the todo and the url from out env variables for frontend api calls
    return {
        props: {
            user,
            url: process.env.API_URL
        }
    }
}

// export component
export default Show