import React, { HTMLAttributes } from 'react'
import { Control, Controller } from 'react-hook-form'
import { IonInput, IonItem, IonLabel } from '@ionic/react'

interface InputFieldProps extends HTMLAttributes<HTMLIonInputElement> {
  type: any
  name: string
  control: Control<any>
}

export const InputField: React.FC<InputFieldProps> = ({ name, control, type, children, inputMode }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <React.Fragment>
            <IonItem>
              <IonLabel position='stacked'>{children}</IonLabel>
              <IonInput
                type={type}
                {...field}
                onIonChange={e => field.onChange(e.detail.value)}
                autocomplete='off'
                inputmode={inputMode}
              />
            </IonItem>
          </React.Fragment>
        )
      }}
      rules={{ required: true }}
    />
  )
}
