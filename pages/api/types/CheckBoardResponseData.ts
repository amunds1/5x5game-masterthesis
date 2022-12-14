type CheckBoardResponseData = {
  message?: string
  row?: {
    wordPosition: number[]
    word: string
    positionIndex: number
    points: number
  }
  column?: {
    wordPosition: number[]
    word: string
    positionIndex: number
    points: number
  }
}

export default CheckBoardResponseData
