export interface Errors {
  message: string[]
  error: string
  statusCode: number
}

export interface Message {
  response_message: string
}

export interface AlertState {
  errors: Errors
  message: Message
}

export interface AlertAction {
  type: 'setErrors' | 'setMessage' | 'reset'
  errors: Errors
  message: Message
}
