import { createContext, Dispatch, SetStateAction } from 'react'
import GameStates from '../types/gameStates'

export interface IGameContext {
  selectedLetter: string | null
  setSelectedLetter: Dispatch<SetStateAction<string | null>>
  gameState:
    | GameStates.PLACE_OWN
    | GameStates.CHOOSE
    | GameStates.PLACE_OPPONENTS
  setGameState: Dispatch<
    SetStateAction<
      GameStates.PLACE_OWN | GameStates.CHOOSE | GameStates.PLACE_OPPONENTS
    >
  >
  gameID: string
  userUID: string
  columnPoints: {
    [key: number]: number
  }
  rowPoints: {
    [key: number]: number
  }
  grid: {
    size: number
    values: string[]
  }
  columnValidWords: {
    [key: number]: string[]
  }
  rowValidWords: {
    [key: number]: string[]
  }
  yourTurn: boolean
  opponentID: string
  setYourTurn: Dispatch<SetStateAction<boolean>>
}

export const GameContext = createContext<IGameContext | null>(null)
