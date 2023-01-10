import { onSnapshot, doc } from 'firebase/firestore'
import { Dispatch, SetStateAction } from 'react'
import yourTurn from '../../../components/game/firebase/yourTurn'
import { db } from '../../../firebase/clientApp'
import gamesConverter from '../../../firebase/converters/gamesConverter'

const nextTurnListener = (
  gameID: string,
  userUID: string,
  setYourTurn: Dispatch<SetStateAction<boolean>>
) =>
  onSnapshot(doc(db, 'games', gameID).withConverter(gamesConverter), (doc) => {
    const data = doc.data()

    // Set value of yourTurn in GameContext to true if nextTurn in Firebase matches uid of authenticated user.
    // False otherwise
    setYourTurn(yourTurn(userUID, data?.nextTurn as string))
  })

export default nextTurnListener
