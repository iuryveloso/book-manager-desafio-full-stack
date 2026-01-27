import type { AlertState } from '@/interfaces/alertsInterfaces'
import { AlertDescription, Alert as UiAlert } from './ui/alert'

interface AlertFunction {
  alertState: AlertState
  children?: React.ReactNode
}

export default function Alert({ alertState, children }: AlertFunction) {
  const isErrorsSetted = alertState.errors.message.length > 0
  const isMessageSetted = alertState.message.response_message.length > 0

  return (
    <div className={'fixed z-10 container flex w-full flex-col items-center'}>
      <UiAlert
        variant={'destructive'}
        className={`flex flex-col items-center bg-red-200 ${isErrorsSetted ? '' : 'hidden'}`}
      >
        {isErrorsSetted ? (
          <>
            {alertState.errors.message.map((error, key) => (
              <AlertDescription key={key}>{error}</AlertDescription>
            ))}
          </>
        ) : (
          false
        )}
      </UiAlert>
      <UiAlert
        className={`flex flex-col items-center bg-green-200 ${isMessageSetted ? '' : 'hidden'}`}
      >
        {isMessageSetted ? (
          <AlertDescription className={'text-green-700'}>
            {alertState.message.response_message}
          </AlertDescription>
        ) : (
          false
        )}
        {children}
      </UiAlert>
    </div>
  )
}
