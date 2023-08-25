import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { ButtonStyleProps, Container, Icon } from "./styles";

interface ButtonProps {
  type?: ButtonStyleProps;
  icon: keyof typeof MaterialIcons.glyphMap;
  [x: string]: any;
}
const ButtonIcon: React.FC<ButtonProps> = ({
  title,
  type = "PRIMARY",
  icon,
  ...props
}) => {
  return (
    <Container {...props}>
      <Icon name={icon} type={type} />
    </Container>
  );
};

export default ButtonIcon;
