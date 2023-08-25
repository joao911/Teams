import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export interface ButtonStyleProps {
  type: "PRIMARY" | "SECONDARY";
}

export const Container = styled.TouchableOpacity<ButtonStyleProps>`
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<ButtonStyleProps>(
  ({ theme, type }) => ({
    size: 24,
    color: type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
  })
)``;
