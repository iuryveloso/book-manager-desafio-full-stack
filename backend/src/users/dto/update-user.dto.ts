import { IsEmail, IsNotEmpty } from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string
}
