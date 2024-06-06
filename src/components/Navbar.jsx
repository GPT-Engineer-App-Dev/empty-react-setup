import { Box, Flex, Link, Button, useColorModeValue, Stack, useDisclosure, IconButton, HStack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { session, logout } = useSupabaseAuth();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}>
              <Link as={RouterLink} to="/">Home</Link>
              <Link as={RouterLink} to="/login">Login</Link>
              {session && <Link as={RouterLink} to="/private">Private</Link>}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {session && <Button onClick={logout}>Logout</Button>}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link as={RouterLink} to="/">Home</Link>
              <Link as={RouterLink} to="/login">Login</Link>
              {session && <Link as={RouterLink} to="/private">Private</Link>}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;