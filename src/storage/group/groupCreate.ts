import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groupsGetAll";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";

export const groupCreate = async (newGroup: string) => {
  try {
    const storedGroups = await groupsGetAll()

    const storage = JSON.stringify([...storedGroups, newGroup])

    const groupAlreadyExists = storedGroups.includes(newGroup)

    if(groupAlreadyExists) {
      throw new AppError("Já existe uma turma com esse nome")
    }

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    console.log("deu erro criando o grupo")
    throw error
  }
}
