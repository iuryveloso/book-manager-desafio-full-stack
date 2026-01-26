import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator'

export class BookDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string

  @IsNotEmpty({ message: 'Author is required' })
  author: string

  @ValidateIf((o: BookDto) => o.year !== undefined && o.year !== null)
  @IsInt({ message: 'Year must be a number' })
  year: number

  @ValidateIf(
    (o: BookDto) => o.description !== undefined && o.description !== null,
  )
  @IsString({ message: 'Description must be a text' })
  description: string
}
