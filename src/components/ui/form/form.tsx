import React from 'react'
import { Button } from '../button/button'
import { Input } from '../input/input'
import styles from './form.module.css'
import { TForm } from './types'

const Form: React.FC<TForm> = ({
  onSubmit,
  onChange,
  inputValue,
  textButton,
  typeInput,
  disabled,
  loaderButton,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input type={typeInput} onChange={handleChange} value={inputValue} />
      <Button
        disabled={disabled}
        isLoader={!loaderButton}
        text={textButton}
        type='submit'
      />
    </form>
  )
}

export default Form
