import { Dispatch, SetStateAction, useContext } from 'react'
import { updateGameState } from '../../../pages/api/utils/updateGameState'
import { updateTurn } from '../../../pages/api/utils/updateTurn'
import GameStates from '../types/gameStates'

const getNextState = (
  prevState: GameStates,
  gameID: string,
  opponentID: string,
  setYourTurn: Dispatch<SetStateAction<boolean>>,
  userUID: string
) => {
  if (prevState === GameStates.CHOOSE) {
    updateGameState(gameID, userUID, GameStates.PLACE_OWN)
    return GameStates.PLACE_OWN
  } else if (prevState === GameStates.PLACE_OWN) {
    updateGameState(gameID, userUID, GameStates.PLACE_OPPONENTS)

    // Turn is finished
    updateTurn(gameID, opponentID)
    setYourTurn(false)

    return GameStates.PLACE_OPPONENTS
  } else if (prevState === GameStates.PLACE_OPPONENTS) {
    updateGameState(gameID, userUID, GameStates.CHOOSE)
    return GameStates.CHOOSE
  } else {
    console.log('An error occured when determining the next game state')
  }
}

export default getNextState
