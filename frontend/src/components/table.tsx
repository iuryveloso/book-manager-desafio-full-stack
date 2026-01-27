import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UiTable,
} from './ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'
import { useState } from 'react'

interface Table {
  items: object[]
  headers: string[]
  rows: number
}

export default function Table({ items, headers, rows }: Table) {
  const [chunk, setChunk] = useState(0)
  function chunkArray(arr: object[], chunkSize: number) {
    const result = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize))
    }
    return result
  }
  const itemsChunked = chunkArray(items, rows)

  return (
    <div className={'flex flex-col h-full'}>
      <UiTable className={''}>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => {
              return <TableHead key={index}>{header}</TableHead>
            })}
          </TableRow>
        </TableHeader>
        <TableBody className={''}>
          {itemsChunked[chunk].map((item, index) => (
            <TableRow key={index}>
              {Object.values(item).map((value, index) => {
                return <TableCell key={index}>{value}</TableCell>
              })}
            </TableRow>
          ))}
        </TableBody>
      </UiTable>
      <Pagination className={'flex items-end grow '}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              data-testid={'pagination_previous_test'}
              onClick={() => setChunk((prev) => (prev > 0 ? prev - 1 : prev))}
              className={'cursor-pointer'}
            />
          </PaginationItem>
          {chunk === 0 ? (
            <PaginationItem className={'-mb-2'}>
              <PaginationLink className={'hover:bg-white'} />
            </PaginationItem>
          ) : (
            false
          )}
          {itemsChunked.map((_, index) => {
            return (
              <div key={index}>
                {index - chunk >= -1 && index - chunk <= 1 ? (
                  <PaginationItem className={'cursor-pointer'}>
                    <PaginationLink
                      data-testid={`pagination_${index + 1}_test`}
                      onClick={() => setChunk(index)}
                      isActive={chunk === index}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  false
                )}
              </div>
            )
          })}
          {chunk === itemsChunked.length - 1 ? (
            <PaginationItem className={'-mb-2'}>
              <PaginationLink className={'hover:bg-white'} />
            </PaginationItem>
          ) : (
            false
          )}
          <PaginationItem>
            <PaginationNext
              data-testid={'pagination_next_test'}
              onClick={() =>
                setChunk((prev) =>
                  prev < itemsChunked.length - 1 ? prev + 1 : prev,
                )
              }
              className={'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
