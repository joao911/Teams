import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, ContentIcon } from "./styles";
import Header from "@components/Header";
import { Icon } from "@components/GroupCard/styles";
import HightLight from "@components/HightLight";
import Button from "@components/Button";
import Input from "@components/Input";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert, ToastAndroid } from "react-native";

const NewGroup: React.FC = () => {
  const [ group, setGroup ] = useState("");
  const navigation = useNavigation();

  const handleNew = async ()=>{
    if(!group.trim()){
      return ToastAndroid.showWithGravity(
        "Informe o nome da turma",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
    }
    try {
      await groupCreate(group);
    navigation.navigate("players", { group});
    } catch (error) {
      if(error instanceof AppError){
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        )
      }else{
        ToastAndroid.showWithGravity(
          "Não foi possível criar a turma",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        )
        console.log("error", error);
      }
    }
    
  }

  useEffect(()=>{console.log("group", group)},[group])

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
        <Input placeholder="Nome da turma" onChangeText={setGroup}/>
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
};

export default NewGroup;
