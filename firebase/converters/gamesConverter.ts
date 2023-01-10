import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import Game from '../../types/Game'

const gamesConverter: FirestoreDataConverter<Game> = {
  toFirestore(game: WithFieldValue<Game>): DocumentData {
    return {
      ...game,
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Game {
    const data = snapshot.data(options)

    return {
      id: snapshot.id,
      boardSize: data.boardSize,
      playerOne: data.playerOne.id,
      playerTwo: data.playerTwo.id,
      isActive: data.isActive,
      proposedAt: JSON.parse(JSON.stringify(data.proposedAt.toDate())) as Date,
      proposedBy: data.proposedBy.id,
      nextTurn: data.nextTurn.id,
      selectedLetter: data.selectedLetter,
      gameState: data.gameState,
    }
  },
}

export default gamesConverter
