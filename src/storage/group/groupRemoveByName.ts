import AsyncStorage from "@react-native-async-storage/async-storage";


import { PLAYERS_COLLECTION, GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export const removeGroupByName = async (groupName: string) => {
  try {
    const storedGroups = await groupsGetAll();
    const groups = storedGroups.filter(item => item !== groupName);
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYERS_COLLECTION}-${groupName}`);
  } catch (error) {
    throw error
  }
}