import React from "react";
import { View } from "react-native";

import { Container, LoadingIndicator } from "./styles";

const Loading: React.FC = () => {
  return (
    <Container>
      <LoadingIndicator />
    </Container>
  );
};

export default Loading;
