import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { Link, useLocation } from "react-router-dom";

function BreadcrumbNav() {
  const location = useLocation();

  console.log(location.pathname);
  return (
    <Breadcrumb
      position={"absolute"}
      top={"10px"}
      right={"10px"}
      separator={<ChevronRightIcon color="gray.500" />}
      zIndex={1}
    >
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/create">
          Create
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default BreadcrumbNav;
