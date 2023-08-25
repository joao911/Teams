import React from "react";
import { View } from "react-native";

import { Container, Message } from "./styles";

interface ListEmptyProps {
  message: string;
}
const ListEmpty: React.FC<ListEmptyProps> = ({ message }) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export default ListEmpty;
