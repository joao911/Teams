import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayersGetByGroup } from "./playersGetByGroup";

export const playersGetGroupsAndTeams = async (group: string,team: string) => {
  try {
    const storage = await PlayersGetByGroup(team)

    const players = storage.filter(players => players.team=== team)
    
    return players
  } catch (error) {
    
  }
}