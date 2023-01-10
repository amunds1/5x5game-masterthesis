const isPartOfValidWord = (
  position: {
    positionIndex: number
    differenceIndex: number
  },
  validWords: Object
) => {
  for (const [key, value] of Object.entries(validWords)) {
    if (Number(key) === position.positionIndex) {
      if (
        position.differenceIndex >= value[0] &&
        position.differenceIndex <= value[1]
      ) {
        return true
      }
    }
  }
  return false
}

export default isPartOfValidWord
