import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { PlayersStorageDTO } from "./PlayerStorageDTO";


export const PlayersGetByGroup = async( group: string)=>{
  try {
   const storage = await AsyncStorage.getItem(`${PLAYERS_COLLECTION}-${group}`);

   const players: PlayersStorageDTO[] = storage ? JSON.parse(storage) : [];

   return players;

  } catch (error) {
    throw error
  }
}

