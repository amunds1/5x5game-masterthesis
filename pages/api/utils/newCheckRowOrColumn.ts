import wordIsValid from './wordIsValid'

const findStartAndEndIndex = (data: string[], differentIndex: number) => {
  let startIndex = differentIndex
  let endIndex = differentIndex

  // differentIndex ->
  for (let i = differentIndex; i < data.length + 1; i++) {
    endIndex = i
    if (data[i] === '') {
      endIndex = i - 1
      break
    }
  }

  // <- differentIndex
  for (let i = differentIndex; i >= 0; i--) {
    startIndex = i
    if (data[i] === '') {
      startIndex = i + 1
      break
    }
  }

  return [startIndex, endIndex]
}

const newCheckRowOrColumn = async (data: string[], differentIndex: number) => {
  // Finn start og end Index
  // inputArray = ['P', '', 'P', 'A', 'I', '']
  // startIndex = 2
  // endIndex = 4
  // differentIndex = 3

  const [startIndex, endIndex] = findStartAndEndIndex(data, differentIndex)

  const tempValidWord = {
    word: '',
    points: 0,
    // Brukes av /api/check
    position: [0, 0],
  }

  let checknum = 0
  // For each cellIndex in input array including up to differentIndex:
  for (let i = startIndex; i <= differentIndex; i++) {
    const maxPossiblePoints = endIndex - i + 1

    for (let k = endIndex; k >= differentIndex; k--) {
      checknum++

      // Join cells to a word
      const joinedWord = data.slice(i, k + 1).join('')
      const joinedWordLength = joinedWord.length

      if (joinedWordLength == 1) {
        break
      }

      const res = await wordIsValid(joinedWord)

      if (res) {
        tempValidWord.word = joinedWord
        tempValidWord.points = joinedWordLength
        tempValidWord.position = [i, k]

        if (joinedWordLength >= maxPossiblePoints - 1) {
          return tempValidWord
        }
      }
    }
  }

  if (tempValidWord.word.length >= 1) {
    return tempValidWord
  }

  return null
}

export default newCheckRowOrColumn
