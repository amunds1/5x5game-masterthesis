import wordIsValid from './wordIsValid'

const checkRowOrColumn = async (data: string[], differentIndex: number) => {
  // In reverse, check words against Ordbok-API
  // Only checks words up to the differentIndex
  for (let k = data.length; k > differentIndex; k--) {
    const word = data.slice(0, k).join('')

    const result = await wordIsValid(word)

    console.log(`${word}: ${result}`)

    if (result) {
      return {
        word: word,
        position: [0, k],
      }
    }
  }

  console.log('Found no valid words')
}

export default checkRowOrColumn
