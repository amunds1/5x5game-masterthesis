import { Button } from '@mantine/core'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { resetServerContext } from 'react-beautiful-dnd'
import { fetchBoardData } from '../../components/game/firebase/fetchBoardData'
import fetchGameData from '../../components/game/firebase/fetchGameData'
import yourTurn from '../../components/game/firebase/yourTurn'
import GameBoard from '../../components/game/GameBoard'
import Points from '../../components/game/Points'
import SelectLetter from '../../components/game/SelectLetter'
import {
  OpponentTurnStatusMessage,
  YourTurnStatusMessage,
} from '../../components/game/TurnStatusMessage'
import GameStates from '../../components/game/types/gameStates'
import {
  GameContext,
  IGameContext,
} from '../../components/game/utils/gameContext'
import selectUserID from '../../components/games/utils/selectUserID'
import fetchUID from '../../firebase/fetchUID'
import BoardData from '../../types/BoardData'
import Game from '../../types/Game'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const gameID = ctx.query.gameID as string

  // Fetch uid, boardData and gameData
  const uid = await fetchUID(ctx)
  const boardData = await fetchBoardData(gameID, uid)
  const gameData = await fetchGameData(gameID)

  // Set intialGameState to be CHOOSE, if selectedLetter is null
  let initialGameState = GameStates.PLACE_OPPONENTS
  if (gameData?.selectedLetter == null) {
    console.log('Hei')
    initialGameState = GameStates.CHOOSE
  }

  return {
    props: {
      uid: uid,
      boardData: boardData,
      gameData: gameData,
      initialGameState: initialGameState,
    },
  }
}

interface IGameID {
  uid: string
  boardData: BoardData
  initialGameState: GameStates
  gameData: Game
}

const GameID = (props: IGameID) => {
  const { uid, boardData, initialGameState, gameData } = props

  // https://github.com/atlassian/react-beautiful-dnd/issues/1756#issuecomment-599388505
  resetServerContext()

  // Assign selectedLetter from Firebase as default value
  const [selectedLetter, setSelectedLetter] = useState<string | null>(
    gameData.selectedLetter || null
  )

  const [gameState, setGameState] = useState<
    GameStates.PLACE_OWN | GameStates.CHOOSE | GameStates.PLACE_OPPONENTS
  >(initialGameState)

  // Populate GameContext
  const GameContextValues: IGameContext = {
    selectedLetter: selectedLetter,
    setSelectedLetter: setSelectedLetter,
    gameState: gameState,
    setGameState: setGameState,
    gameID: gameData.id as string,
    userID: uid,
    rowPoints: boardData.rowPoints,
    columnPoints: boardData.columnPoints,
    grid: {
      size: gameData.boardSize,
      values: boardData.board,
    },
    columnValidWords: boardData.columnValidWords,
    rowValidWords: boardData.rowValidWords,
    yourTurn: yourTurn(gameData.nextTurn as string, uid),
    opponentID: selectUserID(
      uid,
      gameData.playerOne as string,
      gameData.playerTwo as string
    ),
  }

  return (
    <>
      {/* Display who turn it is */}
      {yourTurn(gameData.nextTurn as string, uid) ? (
        <YourTurnStatusMessage />
      ) : (
        <OpponentTurnStatusMessage />
      )}

      <GameContext.Provider value={GameContextValues}>
        <Points />
        <GameBoard />
        {gameState === GameStates.CHOOSE && <SelectLetter />}
      </GameContext.Provider>

      <Link href="/games">
        <Button>Back to games</Button>
      </Link>
    </>
  )
}

export default GameID
