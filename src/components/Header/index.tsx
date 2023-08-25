import React from "react";
import LogoImg from "@assets/logo.png";
import { Container, Logo, BackIcon, BackButton } from "./styles";

interface HeaderProps {
  showBackButton?: boolean;
}
const Header: React.FC<HeaderProps> = ({ showBackButton = false }) => {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={LogoImg} />
    </Container>
  );
};

export default Header;
