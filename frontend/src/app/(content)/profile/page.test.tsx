import '@testing-library/jest-dom/vitest'
import { describe, it } from 'vitest'
import { act, render } from '@testing-library/react'
import Profile from '@/pages/Profile'
import { useNavigate } from 'react-router'

const navigate = useNavigate()

describe('Profile Page', () => {
  it('renders', async () => {
    await act(async () => render(<Profile navigate={navigate} />))
  })
})
