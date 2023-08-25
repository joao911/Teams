import React from "react";

import { Container, FilterStyleProps, Title } from "./styles";

interface FilterProps extends FilterStyleProps {
  title: string;
  [x: string]: any;
}

const Filter: React.FC<FilterProps> = ({
  title,
  isActive = false,
  ...props
}) => {
  return (
    <Container isActive={isActive} {...props}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Filter;
