import React, { useState } from 'react'
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonText,
} from '@ionic/react'
import { Controller, useForm } from 'react-hook-form'

export const MemberForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      phone_number: ''
    }
  })


  const onSubmit = async (data: any) => {
    // await saveMemberCmd(data)
    console.log('data', data)
    setIsLoading(true)
    await new Promise(resolve => {
      setTimeout(() => {
        console.log('hellow')
        resolve('asd')
      }, 2000)
    })
    // setIsLoading(false)
    console.log('paso x aqui')
  }

  return (
    <IonContent fullscreen>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField type='text' name='name' control={control} rules={{ required: 'Por favor introduce su nombre' }}>
          Nombre
        </InputField>
        <InputField type='text' name='surname' control={control}
                    rules={{ required: 'Por favor introduce su apellido' }}>
          Apellido
        </InputField>
        <InputField type='tel' name='phone_number' control={control} inputMode='tel'
                    rules={{ required: 'Por favor introduce su número de teléfono' }}>
          Teléfono
        </InputField>
        <IonButton expand='block' type='submit' style={{ margin: '24px 20px' }} size='default'>Guardar</IonButton>
      </form>
      <IonLoading
        isOpen={isLoading}
        message={'Realizando operación...'}
      />
    </IonContent>
  )
}

const InputField: React.FC<any> = ({ name, control, type, rules, children, inputMode }: any) => {
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
