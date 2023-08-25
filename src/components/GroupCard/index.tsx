import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title, Icon } from "./styles";

interface GroupCardProps {
  title: string;
  [x: string]: any;
}
const GroupCard: React.FC<GroupCardProps> = ({ title, ...props }) => {
  return (
    <Container {...props}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
};

export default GroupCard;
