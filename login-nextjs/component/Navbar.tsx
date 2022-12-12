import NextLink from "next/link";
import { Flex, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

// define the page component
function Navbar() {
  const { data: session } = useSession();

  return (
    <Flex justifyContent="space-around" p={20}>

      <NextLink href="/">
        <Button>Home</Button>
      </NextLink>

      {session && (<NextLink href={"/profile/"+session.user?.id || ""}>
        <Button>Profile</Button>
      </NextLink>)}

      <NextLink href="/auth">
        <Button>Auth</Button>
      </NextLink>

    </Flex>
  );
};

export default Navbar;
