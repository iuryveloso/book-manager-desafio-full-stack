import '@testing-library/jest-dom/vitest'
import { describe, it } from 'vitest'
import { act, render } from '@testing-library/react'
import Auth from '@/pages/Auth'
import { useNavigate } from 'react-router'

const navigate = useNavigate()

describe('Auth Page', () => {
  it('renders', async () => {
    await act(async () => render(<Auth navigate={navigate} />))
  })
})
