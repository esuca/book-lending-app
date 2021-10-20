import React, { HTMLAttributes } from 'react'
import { Control, Controller } from 'react-hook-form'
import { IonInput, IonItem, IonLabel, IonText } from '@ionic/react'

interface InputFieldProps extends HTMLAttributes<HTMLIonInputElement> {
  type: any
  name: string,
  control: Control<any>,
  rules: any
}

export const InputField: React.FC<InputFieldProps> = ({ name, control, type, rules, children, inputMode }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, error } }) => {
        return (
          <React.Fragment>
            <IonItem
              style={{ '--highlight-background': invalid ? 'var(--highlight-color-invalid)' : 'var(--highlight-color-focused)' }}>
              <IonLabel position='stacked'>{children}</IonLabel>
              <IonInput type={type} {...field} onIonChange={e => field.onChange(e.detail.value)} autocomplete='off'
                        inputmode={inputMode} />
            </IonItem>
            {error && <FieldErrorMessage>{error.message}</FieldErrorMessage>}
          </React.Fragment>
        )
      }}
      rules={rules}
    />
  )
}

export const FieldErrorMessage: React.FC = (props) => {
  return <IonText color='danger' style={{ marginLeft: 16, fontSize: 'smaller' }}>{props.children}</IonText>
}
