import React, { useState } from "react";
import { FlatList, ToastAndroid } from "react-native";

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
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddgroup";
import { PlayersGetByGroup } from "@storage/player/playersGetByGroup";
import { playersGetGroupsAndTeams } from "@storage/player/playersGetGroupsAndTeams";
import { PlayersStorageDTO } from "@storage/player/PlayerStorageDTO";


interface routeParams {
  group: string;
}

const Players: React.FC = () => {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayersStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const route = useRoute();
  const {group} = route.params as routeParams;
  
  const handleAddPlayer =  async() => {
      if(newPlayerName.trim().length === 0){
        return ToastAndroid.showWithGravity(
           "Informe o nome da pessoa para adicionar",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        )
      }

      const newPlayer = {
        name: newPlayerName,
        team,
      }

      try {
        await playerAddByGroup(newPlayer, group);
        const players = await PlayersGetByGroup(group);
        console.log("players", players)
      } catch (error) {
        if(error instanceof AppError){
          ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          )
        }else{
          ToastAndroid.showWithGravity(
            "Não foi possível adicionar",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          )
          console.log("error", error);
        }
      }
  }

  const fetchPlayersByTeam = async () => {
    try {
      const playersByTeam = await playersGetGroupsAndTeams(group, team)

    setPlayers(playersByTeam)
    } catch (error) {
      console.log("deu erro")
    }
  }

  


  return (
    <Container>
      <Header showBackButton />
      <HightLight
        title={group}
        subTitle="Adicione a galeta e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa "
         autoCorrect={false} 
         onChangeText={setNewPlayerName} />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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
