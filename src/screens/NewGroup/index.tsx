import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, ContentIcon } from "./styles";
import Header from "@components/Header";
import { Icon } from "@components/GroupCard/styles";
import HightLight from "@components/HightLight";
import Button from "@components/Button";
import Input from "@components/Input";

const NewGroup: React.FC = () => {
  const [ group, setGroup ] = useState("");
  const navigation = useNavigation();

  const handleNew =()=>{
    navigation.navigate("players", { group });
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <ContentIcon>
          <Icon />
        </ContentIcon>
        <HightLight
          title="Nova turma"
          subTitle="Crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" />
        <Button title="Criar" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  );
};

export default NewGroup;
