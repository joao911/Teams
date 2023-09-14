import React, { useState } from "react";
import { FlatList } from "react-native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import Header from "@components/Header";
import HightLight from "@components/HightLight";
import ButtonIcon from "@components/ButtonIcon";
import Input from "@components/Input";
import Filter from "@components/Filter";
import PlayerCard from "@components/PlayerCard";
import ListEmpty from "@components/ListEmpty";
import Button from "@components/Button";
import { useRoute } from "@react-navigation/native";

interface routeParams {
  group: string;
}

const Players: React.FC = () => {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState(["João Paulo"]);
  const route = useRoute();
  const {group} = route.params as routeParams;

  return (
    <Container>
      <Header showBackButton />
      <HightLight
        title={group}
        subTitle="Adicione a galeta e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa " autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={team === item}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  );
};

export default Players;
