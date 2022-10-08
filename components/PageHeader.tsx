import {
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { useState } from 'react'
import ColorSchemeToggle from './ColorSchemeToggle'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}))

interface PageHeaderProps {
  links: { link: string; label: string }[]
}

export function PageHeader({ links }: PageHeaderProps) {
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)
  const { classes, cx } = useStyles()

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Link href={'/'}>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>
            <Text>5x5 game</Text>
          </a>
        </Link>
        <Group spacing={5} className={classes.links}>
          {/* GAMES LINK */}
          <Link href={'/games'} key={'games'}>
            <a
              className={cx(classes.link, {
                [classes.linkActive]: active === '/games',
              })}
              onClick={() => {
                setActive('/games')
              }}
            >
              {'Games'}
            </a>
          </Link>
          <Link href={'/profile'} key={'profile'}>
            <a
              className={cx(classes.link, {
                [classes.linkActive]: active === '/profile',
              })}
              onClick={() => {
                setActive('/profile')
              }}
            >
              {'Profile'}
            </a>
          </Link>
          {/* SIGN IN LINK */}
          <Link href={'/signin'} key={'signin'}>
            <a
              className={cx(classes.link, {
                [classes.linkActive]: active === '/siginin',
              })}
              onClick={() => {
                setActive('/siginin')
              }}
            >
              {'Sign in'}
            </a>
          </Link>
          {/* SIGN OUT LINK */}
          <Link href={'/signout'} key={'signout'}>
            <a
              className={cx(classes.link, {
                [classes.linkActive]: active === '/signout',
              })}
              onClick={() => {
                setActive('/signout')
              }}
            >
              {'Sign out'}
            </a>
          </Link>
          <ColorSchemeToggle />
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  )
}
