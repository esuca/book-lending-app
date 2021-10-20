import React, { useState } from 'react'
import { IonButton, IonContent, IonLoading } from '@ionic/react'
import { useForm } from 'react-hook-form'
import { InputField } from 'src/components/InputField'

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
    setIsLoading(true)
    await new Promise(resolve => {
      setTimeout(() => {
        resolve('asd')
      }, 2000)
    })
    setIsLoading(false)
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
        message={'Guardando...'}
      />
    </IonContent>
  )
}
