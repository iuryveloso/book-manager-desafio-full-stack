import { IsEmail, IsEmpty, IsNotEmpty, ValidateIf } from 'class-validator'

export class RegisterDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  password: string

  @ValidateIf((o: RegisterDto) => o.password !== o.password_confirmation)
  @IsNotEmpty()
  @IsEmpty({ message: 'Confirm Password must match Password' })
  password_confirmation: string
}
