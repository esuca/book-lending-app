import React, { forwardRef, useEffect, useState } from 'react'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react'
import { useForm } from 'react-hook-form'
import { InputField } from 'src/components/InputField'

interface Props {
  presentingElement: HTMLElement
  isOpen: boolean
  onClose: () => void
}

export const MemberFormModal = forwardRef<HTMLIonModalElement, Props>((props, ref) => {
  const router = useIonRouter()
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      phone_number: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (data: any) => {
    // await saveMemberCmd(data)
    await new Promise(resolve => {
      setTimeout(() => {
        resolve('asd')
        console.log('asd')
      }, 200)
    })
    props.onClose()
    router.push('/books')
  }

  useEffect(() => {
    if (props.isOpen) {
      reset({
        name: '',
        surname: '',
        phone_number: ''
      })
    }
  }, [reset, props.isOpen])

  return (
    <IonModal
      ref={ref}
      isOpen={props.isOpen}
      swipeToClose={true}
      presentingElement={props.presentingElement}
      onDidDismiss={props.onClose}
    >
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton onClick={props.onClose}>Cancelar</IonButton>
          </IonButtons>
          <IonTitle>Nuevo miembro</IonTitle>
          <IonButtons slot='end'>
            <IonButton disabled={!isValid} color={!isValid ? 'dark' : 'primary'} onClick={handleSubmit(onSubmit)}>
              OK
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField type='text' name='name' control={control} rules={{ required: 'Por favor introduce su nombre' }}>
            Nombre
          </InputField>
          <InputField
            type='text'
            name='surname'
            control={control}
            rules={{ required: 'Por favor introduce su apellido' }}
          >
            Apellido
          </InputField>
          <InputField
            type='tel'
            name='phone_number'
            control={control}
            inputMode='tel'
            rules={{ required: 'Por favor introduce su número de teléfono' }}
          >
            Teléfono
          </InputField>
        </form>
      </IonContent>
    </IonModal>
  )
})
