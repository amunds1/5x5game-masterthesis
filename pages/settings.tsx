import { Transition } from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { SuccessNotification } from '../components/NotificationBanner'
import ChangeUsername from '../components/settings/ChangeUsername'
import fetchUID from '../firebase/fetchUID'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const uid = await fetchUID(ctx)

    return {
      props: {
        uid,
      },
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
}

const Settings = ({ uid }: { uid: string }) => {
  const [alert, setAlert] = useState(true)

  // Remove alert after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setAlert(false)
    }, 3000)
  }, [])

  return (
    <>
      <Transition
        mounted={alert}
        transition="fade"
        duration={800}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <SuccessNotification
              title="Success"
              contentMessage="Successfully updated profile information"
            />
          </div>
        )}
      </Transition>

      <ChangeUsername uid={uid} />
    </>
  )
}

export default Settings
