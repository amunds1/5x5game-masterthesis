type CheckBoardRequestData = {
  gameID: string
  userID: string
  oponentID: string
  board: string[]
  row: AffectedRowOrColumn
  column: AffectedRowOrColumn
}

export type AffectedRowOrColumn = {
  data: string[]
  positionIndex: number
  differentIndex: number
}

export default CheckBoardRequestData
