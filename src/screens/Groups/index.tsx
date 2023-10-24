import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Container } from "./styles";
import Header from "@components/Header";
import HightLight from "@components/HightLight";
import GroupCard from "@components/GroupCard";
import ListEmpty from "@components/ListEmpty";
import Button from "@components/Button";
import { groupsGetAll } from "@storage/group/groupsGetAll";

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  const HeaderComponent = () => {
    return (
      <View style={{ backgroundColor: "#202024" }}>
        <Header />
        <HightLight title="Turmas" subTitle="Jogue com a sua turma" />
      </View>
    );
  };

  const handleNewGroup = () => {
    navigation.navigate("new")
  }

  const fetchGroups = async ()=>{
    try {
     const data = await groupsGetAll()
     setGroups(data)
    } catch (error) {
     console.log("deu erro:", error)
     
    }
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate("players", { group });
  }

  useFocusEffect(useCallback(()=>{
    fetchGroups()
  },[]))

  return (
    <Container>
      <FlatList
        ListHeaderComponent={HeaderComponent}
        stickyHeaderIndices={[0]}
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)}/>}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
};

export default Groups;
