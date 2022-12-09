import NextLink from "next/link";
import { Flex, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

// define the page component
function Navbar() {
  const { data: session } = useSession();

  return (
    <Flex justifyContent="space-around" p={20}>
      <Button>
        <NextLink href="/">Home</NextLink>
      </Button>
      {session &&(<Button>
        <NextLink href="/profile">Profile</NextLink>
      </Button>)}
      <Button>
        <NextLink href="/auth">Auth</NextLink>
      </Button>
    </Flex>
  );
};

export default Navbar;