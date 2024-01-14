import { Button, Flex, Input } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { IconButton, useBreakpointValue } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { ChangeEvent, useState } from "react";
import { Actions, useStoreActions } from "easy-peasy";
import { IModel } from "../../lib/store";

interface INavProps {
  handleSearch: () => void;
}

const Nav: React.FC<INavProps> = ({ handleSearch }) => {
  const nav = useNavigate();
  const setSearchTerm = useStoreActions(
    (actions: Actions<IModel>) => actions.setSearchTerm,
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconSize = useBreakpointValue({ base: "md", md: "lg" });
  const MenuIcon = isMenuOpen ? CloseIcon : HamburgerIcon;

  function handleClick() {
    nav("/create");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <Flex
      as={"nav"}
      width="100%"
      height={{ base: "20%", lg: "10%" }}
      p={5}
      justifyContent={"flex-end"}
      alignItems={{ base: "flex-start", lg: "center" }}
      flexDirection={{ base: "column", lg: "row" }}
      position={"relative"}
    >
      <IconButton
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        icon={<MenuIcon />}
        size={iconSize}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        {...(isMenuOpen && { variant: "outline" })}
        display={{ base: "flex", lg: "none" }}
        alignSelf={"flex-end"}
      />

      <Button
        variant={"link"}
        onClick={handleClick}
        mr={4}
        mb={{ base: 4, lg: 0 }}
        display={{ base: "none", lg: "flex" }}
      >
        Create Article
      </Button>
      <Flex display={{ base: "none", lg: "flex" }}>
        <Input
          placeholder="Search..."
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          mr={2}
        />
        <Button variant={"custom"} onClick={handleSearch}>
          Search
        </Button>
      </Flex>

      {isMenuOpen && (
        <>
          <Button
            variant={"link"}
            onClick={handleClick}
            mr={4}
            mb={{ base: 4, lg: 0 }}
            display={{ base: "flex", lg: "none" }}
          >
            Create Article
          </Button>
          <Flex display={{ base: "flex", lg: "none" }}>
            <Input
              placeholder="Search..."
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              mr={2}
            />
            <Button variant={"custom"} onClick={handleSearch}>
              Search
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default Nav;
