import React from "react";
import { View } from "react-native";

import { Container, Title, SubTitle } from "./styles";

interface HightLightProps {
  title: string;
  subTitle: string;
}
const HightLight: React.FC<HightLightProps> = ({ title, subTitle }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </Container>
  );
};

export default HightLight;
