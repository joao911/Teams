import React, { useEffect, useState, useRef } from "react";
import { FlatList, TextInput, ToastAndroid, Keyboard, Alert } from "react-native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import Header from "@components/Header";
import HightLight from "@components/HightLight";
import ButtonIcon from "@components/ButtonIcon";
import Input from "@components/Input";
import Filter from "@components/Filter";
import PlayerCard from "@components/PlayerCard";
import ListEmpty from "@components/ListEmpty";
import Button from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddgroup";
import { PlayersGetByGroup } from "@storage/player/playersGetByGroup";

import { PlayersStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerGetByGroupAndTeam } from "@storage/player/playersGetGroupsAndTeams";
import { removePlayerByGroup } from "@storage/player/playerRemoveByGroup";
import { removeGroupByName } from "@storage/group/groupRemoveByName";


interface routeParams {
  group: string;
}

const Players: React.FC = () => {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayersStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const {group} = route.params as routeParams;
  const newPlayerNameInputRef = useRef<TextInput>(null);
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
        newPlayerNameInputRef?.current?.blur()
        Keyboard.dismiss()
        const players = await PlayersGetByGroup(group);
        setNewPlayerName('')
        fetchPlayersByTeam()
      } catch (error) {
        if(error instanceof AppError){
          console.log('cai aqui')
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
      const playersByTeam = await playerGetByGroupAndTeam(group, team)

    setPlayers(playersByTeam)
    } catch (error) {
      console.log("deu erro")
      console.log('error', error)

      ToastAndroid.showWithGravity(
        "Não foi possível carregar os jogadores",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
    }
  }

  const removePlayer = async (playerName: string) => {
    try {
      await removePlayerByGroup(group, playerName)
      fetchPlayersByTeam()
    } catch (error) {
      throw error
    }
  }

  const removeGroup = async () => {
    try {
      removeGroupByName(group)
      navigation.navigate("groups")
    } catch (error) {
      throw error
    }
  }

  const handleRemoveGroup = async () => {
    Alert.alert(
      'Remover',
      'Deseja remover o grupo?',
      [{
        text: 'Não', style:'cancel'
      },
      {
        text: 'Sim', onPress: async () => removeGroup()
      }
    ]
    )
  }

  useEffect(()=>{fetchPlayersByTeam()},[team])

  


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
         onChangeText={setNewPlayerName} 
         value={newPlayerName}
         inputRef={newPlayerNameInputRef}
         onSubmitEditing={handleAddPlayer}
         returnKeyType="done"
         />
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {removePlayer(item.name)}} />
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
      <Button title="Remover Turma" type="SECONDARY" onPress={() => handleRemoveGroup()}/>
    </Container>
  );
};

export default Players;
