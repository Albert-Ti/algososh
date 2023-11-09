export type TForm = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onChange: (value: string) => void
  inputValue: string | number
  loaderButton: boolean
  typeInput: 'text' | 'number'
  disabled: boolean
  textButton: string
}
