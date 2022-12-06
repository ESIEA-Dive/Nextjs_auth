import { Heading, Text, Container, Center, VStack, Image, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const profile = () => {
  const { data: session } = useSession();

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
          <Text color="teal" fontSize={15}>{session?.user?.name}</Text>
          <Text color="gray" fontSize={30}>Email</Text>
          <Text color="teal" fontSize={15}>{session?.user?.email}</Text>
        </VStack>
      </Center>
    </Container>

  );
};

export default profile;