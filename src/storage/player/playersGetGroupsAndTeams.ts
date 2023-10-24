import { PlayersGetByGroup } from "./playersGetByGroup"

export const playerGetByGroupAndTeam = async (group: string, team: string) => {
  try {
    const storage = await PlayersGetByGroup(group)

    const players = storage.filter(player => player.team === team)
    return players;
  } catch (error) {
    throw error
  }
}