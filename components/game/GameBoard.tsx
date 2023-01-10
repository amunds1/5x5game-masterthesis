import { Box, Button, Container, createStyles, Grid } from '@mantine/core'
import { useContext, useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { AffectedRowOrColumn } from '../../pages/api/types/CheckBoardRequestData'
import yourTurn from './firebase/yourTurn'
import LetterBox from './LetterBox'
import GameStates from './types/gameStates'
import colorCellGreen from './utils/colorCellGreen'
import {
  findAffectedColumn,
  findAffectedRow,
} from './utils/findAffectedRowOrColumn'
import { GameContext } from './utils/gameContext'
import getNextState from './utils/getNextState'
import submitMove from './utils/submitMove'

const useStyles = createStyles(() => ({
  grid: {
    border: '2px solid black',
  },
  col: {
    backgroundColor: 'white',
    border: '1px solid grey',
    textAlign: 'center',
  },
  cell: {
    padding: '10px',
    overflow: 'auto',
  },
  cellValid: {
    backgroundColor: 'green',
    padding: '10px',
    overflow: 'auto',
  },
  container: {
    padding: '50px',
  },
}))

const GameBoard = () => {
  const gameContext = useContext(GameContext)

  const { classes } = useStyles()
  const [boardSize, setBoardSize] = useState<number>(
    gameContext?.grid.size || 0
  )
  const [board, setBoard] = useState<string[]>(
    gameContext?.grid.values as string[]
  )
  const [affectedRow, setAffectedRow] = useState<AffectedRowOrColumn>()
  const [affectedColumn, setAffectedColumn] = useState<AffectedRowOrColumn>()

  // Regret move
  const [dropID, setDropID] = useState<number>()
  const [prevLetter, setPrevLetter] = useState<string>('')
  const [tempBoard, setTempBoard] = useState<string[]>([''])

  const addLetter = (
    board: string[],
    endIndex: number,
    selectedLetter: string | null
  ) => {
    selectedLetter ? selectedLetter : (selectedLetter = prevLetter)
    console.log('AddLetter ', selectedLetter)

    const newBoard = Array.from(board)
    newBoard[endIndex] = selectedLetter
    setPrevLetter(selectedLetter)
    gameContext!.setSelectedLetter(null)
    return newBoard
  }

  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.destination.droppableId === 'letterStartBox' ||
      !gameContext
    ) {
      return
    }
    const index = Number(result.destination.droppableId)
    // Used to place the letterbox inside the cell its dropped into
    setDropID(index)

    const newBoard: string[] = addLetter(
      board,
      index,
      gameContext.selectedLetter
    )
    setTempBoard(newBoard)

    const row: AffectedRowOrColumn = findAffectedRow({
      boardSize,
      index: index,
      newBoard,
    })

    const column: AffectedRowOrColumn = findAffectedColumn({
      boardSize,
      index: index,
      newBoard,
    })

    setAffectedRow(row)
    setAffectedColumn(column)
  }

  const submit = () => {
    if (tempBoard.length === boardSize ** 2 && gameContext) {
      affectedRow &&
        affectedColumn &&
        submitMove({
          gameID: gameContext.gameID,
          userID: gameContext.userUID,
          board: tempBoard,
          row: affectedRow,
          column: affectedColumn,
        })
      setBoard(tempBoard)
      setTempBoard([''])

      // Set gameState in GameContext using getNextState
      gameContext.setGameState(
        getNextState(
          gameContext.gameState,
          gameContext.gameID,
          gameContext.opponentID,
          gameContext.setYourTurn,
          gameContext.userUID
        ) as GameStates
      )
    } else {
      // TODO: add as feeback messeage
      console.log('You have to place the letter')
    }
  }

  // Re-render board after response from /api/check
  useEffect(() => {}, [board])
  /* 
  console.log(
    `Your turn: ${gameContext?.yourTurn} \nGame state: ${gameContext?.gameState}`
  ) */

  return (
    <>
      {gameContext && (
        <Container className={classes.container}>
          <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ padding: '0 0 20px 0' }}>
              <Grid className={classes.grid} columns={gameContext.grid.size}>
                {board.map((cellValue, index) => (
                  <Grid.Col className={classes.col} key={index} span={1}>
                    <>
                      {cellValue.length === 0 && (
                        <Droppable droppableId={index.toString()}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              style={{
                                backgroundColor: snapshot.isDraggingOver
                                  ? 'MediumSeaGreen'
                                  : 'white',
                                maxHeight: '40px',
                              }}
                            >
                              {dropID === index && (
                                <LetterBox
                                  letter={prevLetter}
                                  index={1}
                                ></LetterBox>
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      )}
                      {cellValue.length !== 0 && (
                        <Box
                          className={classes.cell}
                          style={{
                            backgroundColor: colorCellGreen(
                              index,
                              boardSize,
                              gameContext.rowValidWords,
                              gameContext.columnValidWords
                            ),
                          }}
                        >
                          {cellValue}
                        </Box>
                      )}
                    </>
                  </Grid.Col>
                ))}
              </Grid>
            </div>
            {(gameContext.gameState === GameStates.PLACE_OWN ||
              gameContext.gameState === GameStates.PLACE_OPPONENTS) &&
              gameContext.yourTurn && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Droppable droppableId="letterStartBox">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          padding: '10px',
                          width: 'fit-content',
                        }}
                      >
                        {gameContext.selectedLetter &&
                          gameContext.selectedLetter.length > 0 && (
                            <LetterBox
                              letter={gameContext.selectedLetter}
                              index={-1}
                            ></LetterBox>
                          )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )}
          </DragDropContext>

          {(gameContext.gameState === GameStates.PLACE_OWN ||
            gameContext.gameState === GameStates.PLACE_OPPONENTS) &&
            gameContext.yourTurn && (
              <Button onClick={() => submit()}>Submit</Button>
            )}
        </Container>
      )}
    </>
  )
}

export default GameBoard
