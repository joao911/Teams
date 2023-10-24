import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppError} from "@utils/AppError"
import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { PlayersStorageDTO } from "./PlayerStorageDTO";
import { PlayersGetByGroup } from "./playersGetByGroup";

export const playerAddByGroup = async (newPlayer:PlayersStorageDTO,group: string)=>{
  try {
    const storedPlayers = await PlayersGetByGroup(group);

    const playersAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name)

    if(playersAlreadyExists.length > 0){
      throw new AppError("Essa pessoa já está adicionada em um time aqui")
    }

     const storage = JSON.stringify([...storedPlayers,newPlayer])

    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, storage)
  } catch (error) {
    
  }
}