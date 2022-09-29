import { useRouter } from 'next/router'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { doc, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase, { db } from '../../firebase/clientApp'

export type GameStandalone = {
  boardSize: number
  player1: {
    board: string
    user: string
  }
}

const GameID = () => {
  const router = useRouter()
  const [gameID, setgameID] = useState<string | undefined>()

  const userID = 'l7QwyHv2CWWPb2LZPxcnQFtiNLs1'

  useEffect(() => {
    if (!router.isReady) return

    const { gameID } = router.query
    setgameID(gameID as string)
  }, [gameID, router.isReady, router.query])

  const [value, loading, error] = useDocument(
    doc(getFirestore(firebase), `games/${gameID}/${userID}/boardData`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const data = value?.data()

  return (
    data && (
      <div>
        <p>Gameboard {data.board}</p>

        <Link href="/games">
          <Button>Back to games</Button>
        </Link>
      </div>
    )
  )
}

export default GameID
