import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import NavProfile from './navProfile'
import type { User } from '@/interfaces/userInterfaces'
import type { NavigateFunction } from 'react-router'

interface Mock {
  user: User
  navigate: NavigateFunction
  onClickLogout: () => void
}

const mock: Mock = {
  navigate: () => {},
  user: {
    name: 'Mock Name',
    email: 'mock.email@email.com',
  },
  onClickLogout: () => [],
}

describe('NavProfile', () => {
  render(
    <NavProfile
      user={mock.user}
      navigate={mock.navigate}
      onClickLogout={mock.onClickLogout}
    />,
  )

  it('renders a profile image', () => {
    const image = screen.getAllByRole('img')[0]
    expect(image).toBeInTheDocument()
  })

  it('renders hidden items', () => {
    const button = screen.getAllByRole('img')[0]
    fireEvent.click(button)

    const userName = screen.getByText(mock.user.name)
    expect(userName).toBeInTheDocument()

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toBeInTheDocument()
    expect(buttons[0]).toHaveTextContent('User profile')
    expect(buttons[1]).toBeInTheDocument()
    expect(buttons[1]).toHaveTextContent('Log out')
  })
})
