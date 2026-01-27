import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { AlertState } from '@/interfaces/alertsInterfaces'
import type { User } from '@/interfaces/userInterfaces'
import { Layout } from './layout'
import type { NavigateFunction } from 'react-router'

interface Layout {
  children: React.ReactNode
  title?: string
  alertState: AlertState
  user: User
  navigate: NavigateFunction
  onClickLogout: () => void
}
const mock: Layout = {
  navigate: () => {},
  children: <div data-testid={'mockChildren'}></div>,
  title: 'Mock Title',
  alertState: {
    errors: {
      message: ['mock error message'],
      error: 'mock error',
      statusCode: 500,
    },
    message: { response_message: 'mock message' },
  },
  user: {
    name: 'Mock Name',
    email: 'mock.email@email.com',
    avatar: 'mock_avatar.png',
  },
  onClickLogout: () => [],
}

describe('Card', () => {
  render(
    <Layout
      title={mock.title}
      alertState={mock.alertState}
      user={mock.user}
      navigate={mock.navigate}
      onClickLogout={mock.onClickLogout}
    >
      {mock.children}
    </Layout>,
  )
  it('renders a right content', () => {
    const children = screen.getByTestId('mockChildren')
    expect(children).toBeInTheDocument()

    const title = screen.getByText(mock.title ?? '')
    expect(title).toBeInTheDocument()

    const errors = screen.getByText(mock.alertState.errors.message[0])
    expect(errors).toBeInTheDocument()

    const message = screen.getByText(mock.alertState.message.response_message)
    expect(message).toBeInTheDocument()
  })
})
