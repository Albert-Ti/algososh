import React from 'react'

export const useForm = (inputValues: { [key: string]: string } = {}) => {
  const [values, setValues] = React.useState(inputValues)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setValues({ ...values, [name]: value })
  }
  return { values, setValues, handleChange }
}
