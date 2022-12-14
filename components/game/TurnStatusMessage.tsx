import { Alert } from '@mantine/core'

export const YourTurnStatusMessage = () => {
  return (
    <Alert title="It is your turn!" radius="xl">
      Drag the letter to the grid
    </Alert>
  )
}

export const OpponentTurnStatusMessage = () => {
  return (
    <Alert title="It is your opponents turn!" radius="xl">
      Sit back and relax or plan your next move!
    </Alert>
  )
}
