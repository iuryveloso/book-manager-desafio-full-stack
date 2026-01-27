import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Table from './table'

interface Mock {
  items: object[]
  headers: string[]
  rows: number
}

const mock: Mock = {
  headers: ['Header 1', 'Header 2', 'Header 3'],
  items: [
    { col1: 'Row 1 Col 1', col2: 'Row 1 Col 2', col3: 'Row 1 Col 3' },
    { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
    { col1: 'Row 3 Col 1', col2: 'Row 3 Col 2', col3: 'Row 3 Col 3' },
    { col1: 'Row 4 Col 1', col2: 'Row 4 Col 2', col3: 'Row 4 Col 3' },
  ],
  rows: 2,
}

describe('Table Component', () => {
  render(<Table items={mock.items} headers={mock.headers} rows={mock.rows} />)

  it('renders table headers correctly', () => {
    mock.headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument()
    })
  })

  it('renders the correct number of rows per page', () => {
    const rowsOnPage = screen.getAllByRole('row')
    expect(rowsOnPage.length - 1).toBe(mock.rows)
  })

  it('navigate to the pagination links', () => {
    const activeLink = screen.getByTestId('pagination_1_test')
    expect(activeLink).toHaveTextContent('1')
    expect(activeLink).toHaveAttribute('data-active', 'true')

    expect(screen.getByText('Row 1 Col 1', { trim: true })).toBeInTheDocument()

    const nextButton = screen.getByTestId('pagination_next_test')
    expect(nextButton.firstElementChild).toHaveTextContent(/next/i)
    fireEvent.click(nextButton)

    const newActiveLink = screen.getByTestId('pagination_2_test')
    expect(newActiveLink).toHaveTextContent('2')
    expect(newActiveLink).toHaveAttribute('data-active', 'true')

    expect(screen.getByText('Row 3 Col 1', { trim: true })).toBeInTheDocument()

    const previousButton = screen.getByTestId('pagination_previous_test')
    expect(previousButton.children[1]).toHaveTextContent(/previous/i)
    fireEvent.click(previousButton)

    const previousActiveLink = screen.getByTestId('pagination_1_test')
    expect(previousActiveLink).toHaveTextContent('1')
    expect(previousActiveLink).toHaveAttribute('data-active', 'true')
  })
})
