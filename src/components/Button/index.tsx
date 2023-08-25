import React from "react";

import { Container, Title, TypeButtonProps } from "./styles";
interface ButtonProps {
  title: string;
  type?: TypeButtonProps;
  [x: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  title,
  type = "PRIMARY",
  ...props
}) => {
  return (
    <Container type={type} {...props}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;
