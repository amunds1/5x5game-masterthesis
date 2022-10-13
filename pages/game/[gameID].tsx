import { Button } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import { doc, getFirestore } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
import GameBoard from '../../components/game/GameBoard'
import firebase from '../../firebase/clientApp'
import boardDataConverter from '../../firebase/converters/boardDataConverter'

const GameID = () => {
  const router = useRouter()
  const [gameID, setgameID] = useState<string>()

  const [userAuthData, loadingUserAuthData, userAuthDataError] = useAuthState(
    getAuth(firebase)
  )

  useEffect(() => {
    if (!router.isReady) return

    const { gameID } = router.query
    setgameID(gameID as string)
  }, [gameID, router.isReady, router.query])

  const [value, loading, error] = useDocument(
    doc(
      getFirestore(firebase),
      `games/${gameID}/${userAuthData?.uid}/boardData`
    ).withConverter(boardDataConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const data = value?.data()

  return (
    data &&
    gameID &&
    userAuthData && (
      <div>
        <p>Gameboard {data.board}</p>
        <GameBoard
          grid={{
            size: 3,
            values: data.board,
          }}
          gameID={gameID}
          userID={userAuthData.uid}
          rowValidWords={data.rowValidWords}
          columnValidWords={data.columnValidWords}
          colPoints={data.colPoints}
          rowPoints={data.rowPoints}
        />

        <Link href="/games">
          <Button>Back to games</Button>
        </Link>
      </div>
    )
  )
}

export default GameID
