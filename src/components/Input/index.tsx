import React from "react";
import { TextInputProps } from "react-native";

import { Container } from "./styles";
import { useTheme } from "styled-components";

const Input: React.FC = ({ ...rest }: TextInputProps) => {
  const { COLORS } = useTheme();
  return <Container placeholderTextColor={COLORS.GRAY_300} {...rest} />;
};

export default Input;
