import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'
import GameStates from '../components/game/types/gameStates'

interface Game {
  id?: string
  isActive: boolean
  boardSize: number
  playerOne: DocumentReference<DocumentData> | string
  playerTwo: DocumentReference<DocumentData> | string
  proposedAt: Timestamp | Date
  proposedBy: DocumentReference<DocumentData> | string
  nextTurn: DocumentReference<DocumentData> | string
  selectedLetter: string | null
  gameState: GameStates
}

export default Game
