import React from 'react'
import { Notification } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'

/* 
  Notification banners

  https://mantine.dev/core/notification/
*/

interface INotification {
  contentMessage: string
  title?: string
}

export const SuccessNotification = ({
  contentMessage,
  title,
}: INotification) => (
  <Notification icon={<IconCheck size={18} />} color="teal" title={title}>
    {contentMessage}
  </Notification>
)

export const ErrorNotification = ({ contentMessage, title }: INotification) => (
  <Notification icon={<IconX size={18} />} color="red" title={title}>
    {contentMessage}
  </Notification>
)

export const LoadingNotification = ({
  contentMessage,
  title,
}: INotification) => (
  <Notification loading title={title} disallowClose>
    {contentMessage}
  </Notification>
)

export const DefaultNotification = ({
  contentMessage,
  title,
}: INotification) => <Notification title={title}>{contentMessage}</Notification>
