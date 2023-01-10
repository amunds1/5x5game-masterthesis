import { Button, Select } from '@mantine/core'
import { useContext } from 'react'
import { updateGameState } from '../../pages/api/utils/updateGameState'
import updateSelectedLetter from '../../pages/api/utils/updateSelectedLetter'
import GameStates from './types/gameStates'
import { GameContext } from './utils/gameContext'

const SelectLetter = () => {
  const gameContext = useContext(GameContext)

  return (
    <>
      {gameContext?.yourTurn && (
        <>
          <Select
            label="Select letter"
            placeholder=""
            value={gameContext.selectedLetter}
            onChange={gameContext.setSelectedLetter}
            data={[
              { value: 'P', label: 'P' },
              { value: 'A', label: 'A' },
              { value: 'I', label: 'I' },
              { value: 'O', label: 'O' },
              { value: 'L', label: 'L' },
              { value: 'E', label: 'E' },
            ]}
          />
          <Button
            onClick={() => {
              // Set game state to 'PLACE'
              gameContext.setGameState(GameStates.PLACE_OWN)
              updateGameState(
                gameContext.gameID,
                gameContext.userUID,
                GameStates.PLACE_OWN
              )

              // Update selectedLetter
              updateSelectedLetter(
                gameContext.gameID,
                gameContext.selectedLetter as string
              )
            }}
          >
            Choose letter
          </Button>
        </>
      )}
    </>
  )
}

export default SelectLetter
