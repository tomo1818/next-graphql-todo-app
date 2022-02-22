import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const { data: session } = useSession(); // 認証データ

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Todo List
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text>Docs</Text>
        <Text>Examples</Text>
        <Text>Blog</Text>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        alignItems={{md: "center"}}
        mt={{ base: 4, md: 0 }}
      >
        {session ? (
          <>
            <p
              style={{marginRight: '10px'}}
            >Signed in as {session.user!.name}</p>
            <Button
              onClick={() => signOut()}
              variant="outline"
              _hover={{ bg: "teal.700", borderColor: "teal.700" }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => signIn()}
            variant="outline"
            _hover={{ bg: "teal.700", borderColor: "teal.700" }}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
