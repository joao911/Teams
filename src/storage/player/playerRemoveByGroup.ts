import AsyncStorage from "@react-native-async-storage/async-storage";

import { PlayersGetByGroup } from "./playersGetByGroup"
import { PLAYERS_COLLECTION } from "@storage/storageConfig";

export const removePlayerByGroup = async (group: string, playerName: string) => {
  try {
    const storage = await PlayersGetByGroup(group)
    const filtered = storage.filter(item => item.name !== playerName)
    const players = JSON.stringify(filtered)
    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, players)
  } catch (error) {
    
  }
}