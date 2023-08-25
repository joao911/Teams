import React from "react";
import { View } from "react-native";

import { Container, Name, Icon } from "./styles";
import ButtonIcon from "@components/ButtonIcon";

interface PlayerCardProps {
  name: string;
  onRemove?: () => void;
}
const PlayerCard: React.FC<PlayerCardProps> = ({ name, onRemove }) => {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </Container>
  );
};

export default PlayerCard;
