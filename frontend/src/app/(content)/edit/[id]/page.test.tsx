import '@testing-library/jest-dom/vitest'
import { describe, it } from 'vitest'
import { act, render } from '@testing-library/react'
import Dashboard from '@/pages/Dashboard'
import { useNavigate } from 'react-router'

const navigate = useNavigate()

describe('Dashboard Page', () => {
  it('renders', async () => {
    await act(async () => render(<Dashboard navigate={navigate} />))
  })
})
