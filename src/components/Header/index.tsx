import React from "react";
import { useNavigation } from "@react-navigation/native";
import LogoImg from "@assets/logo.png";
import { Container, Logo, BackIcon, BackButton } from "./styles";

interface HeaderProps {
  showBackButton?: boolean;
}
const Header: React.FC<HeaderProps> = ({ showBackButton = false }) => {
const navigation = useNavigation();

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={() => navigation.navigate("groups")}   >
          <BackIcon />
        </BackButton>
      )}
      <Logo source={LogoImg} />
    </Container>
  );
};

export default Header;
