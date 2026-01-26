import { IsEmpty, IsNotEmpty, ValidateIf } from 'class-validator'

export class UpdatePasswordUserDto {
  current_password: string

  @IsNotEmpty({ message: 'New Password is required' })
  password: string

  @ValidateIf(
    (o: UpdatePasswordUserDto) => o.password !== o.password_confirmation,
  )
  @IsNotEmpty({ message: 'Password confirmation is required' })
  @IsEmpty({ message: 'Confirm Password must match New Password' })
  password_confirmation: string
}
