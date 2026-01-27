import type { ChangeEvent, JSX } from 'react'
import { Input as UiInput } from '@/components/ui/input'
import { Button as UiButton } from '@/components/ui/button'

interface Icon {
  className: string
}

interface Input {
  id?: string
  Icon?: ({ className }: Icon) => JSX.Element
  value: string
  type?: string
  placeholder?: string
  onCLickIcon?: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  id,
  Icon,
  onChange,
  value,
  type,
  onCLickIcon,
  placeholder,
}: Input) {
  return (
    <div
      className={
        'flex focus-within:rounded-lg focus-within:outline-3 focus-within:outline-gray-300'
      }
    >
      <UiInput
        type={type ?? 'text'}
        id={id as string}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={Icon ? 'rounded-r-none' : ''}
      />
      {Icon ? (
        <div>
          {onCLickIcon ? (
            <UiButton
              onClick={onCLickIcon}
              className={'rounded-l-none rounded-r-md border-y border-r'}
              variant={'ghost'}
            >
              <Icon className={'text-gray-900'} />
            </UiButton>
          ) : (
            false
          )}
        </div>
      ) : (
        false
      )}
    </div>
  )
}
