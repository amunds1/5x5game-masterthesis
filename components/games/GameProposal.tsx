import { Avatar, Badge, Button, Card, Center, Group } from '@mantine/core'
import { useEffect, useState } from 'react'
import Game from '../../types/Game'
import acceptProposedGame from './firebase/acceptProposedGame'
import rejectProposedGame from './firebase/rejectProposedGame'
import withdrawGameProposal from './firebase/withdrawGameProposal'
import Oponent from './Oponent'

interface IGameProposal {
  game: Game
  userUID: string
}

const GameProposal = ({ game, userUID }: IGameProposal) => {
  const [gameProposedTimeDelta, setGameProposedTimeDelta] = useState<{
    value: number
    label: string
  }>({ value: 0, label: '' })

  useEffect(() => {
    const proposedAtAsDate = new Date(game.proposedAt as Date)
    const timeDelta = Date.now() - proposedAtAsDate.getTime()

    const timeDeltaSeconds = timeDelta / 1000
    const timeDeltaMinutes = timeDeltaSeconds / 60
    const timeDeltaHours = timeDeltaMinutes / 60

    setGameProposedTimeDelta({
      value: Math.round(timeDeltaHours),
      label: 'hours',
    })
  }, [game])

  return (
    <Card>
      <Group position="apart" mt="md" mb="xs">
        <Oponent game={game} userUID={userUID} />
        <Badge color="orange" variant="light">
          {gameProposedTimeDelta.value} {gameProposedTimeDelta.label} ago
        </Badge>
      </Group>
      <Center>
        <Avatar color="cyan" radius="xl" size={'lg'}>
          AB
        </Avatar>
      </Center>

      {userUID != (game.proposedBy as string) && (
        <>
          {/* ACCEPT PROPOSAL BUTTON */}
          <Button
            onClick={async () => {
              await acceptProposedGame({
                gameID: game.id!,
                userUID: game.playerOne as string,
              })
              await acceptProposedGame({
                gameID: game.id!,
                userUID: game.playerTwo as string,
              })
            }}
            variant="light"
            color="green"
            fullWidth
            mt="md"
            radius="md"
          >
            Accept
          </Button>

          <Center>
            {/* REJECT PROPOSAL BUTTON */}
            <Button
              variant="subtle"
              color="red"
              mt="md"
              radius="md"
              onClick={async () => {
                await rejectProposedGame({
                  gameID: game.id!,
                  userUID: game.playerOne as string,
                })
                await rejectProposedGame({
                  gameID: game.id!,
                  userUID: game.playerTwo as string,
                })
              }}
            >
              Reject
            </Button>
          </Center>
        </>
      )}

      {userUID === game.proposedBy && (
        <Button
          onClick={async () => {
            await withdrawGameProposal({
              gameID: game.id!,
              userUID: game.playerOne as string,
            })
            await withdrawGameProposal({
              gameID: game.id!,
              userUID: game.playerTwo as string,
            })
          }}
          variant="light"
          color="red"
          fullWidth
          mt="md"
          radius="md"
        >
          Withdraw proposal
        </Button>
      )}
    </Card>
  )
}

export default GameProposal
