import { getIn, useFormikContext } from 'formik'
import React, { Fragment } from 'react'

interface CustomInputProps extends React.InputHTMLAttributes<any> {
  name: string
}

const Input: React.FC<CustomInputProps> = ({ name, ...props }) => {
  const {
    values,
    setFieldValue,
    errors,
    handleBlur,
    touched,
  } = useFormikContext()
  const value = getIn(values, name) || ''
  const error = getIn(errors, name)
  const touch = getIn(touched, name)

  return (
    <Fragment>
      <br />
      <input
        name={name}
        value={value}
        onChange={(e) => setFieldValue(name, e.target.value)}
        // invalid={error && touch && true}
        onBlur={handleBlur}
        {...props}
      />

      {error && touch && (
        <div className="text-danger" style={{ color: '#ff5864' }}>
          <small>{error}</small>
        </div>
      )}
    </Fragment>
  )
}

export default Input
