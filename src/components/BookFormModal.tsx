import React, { forwardRef, useEffect, useState } from 'react'
import { IonButton, IonButtons, IonContent, IonHeader, IonLoading, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import { useForm } from 'react-hook-form'
import { InputField } from 'src/components/InputField'

interface Props {
  presentingElement: HTMLElement
  isOpen: boolean
  onClose: () => void
}

export const BookFormModal = forwardRef<HTMLIonModalElement, Props>((props, ref) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm({
    defaultValues: {
      title: '',
      book_number: ''
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
  }

  useEffect(() => {
    if (props.isOpen) {
      reset({
        title: '',
        book_number: ''
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
          <IonTitle>Nuevo libro</IonTitle>
          <IonButtons slot='end'>
            <IonButton disabled={!isValid} color={!isValid ? 'dark' : 'primary'} onClick={handleSubmit(onSubmit)}>
              OK
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField type='text' name='name' control={control} rules={{ required: 'Por favor introduce su título' }}>
            Título
          </InputField>
          <InputField
            type='text'
            name='surname'
            control={control}
            rules={{ required: 'Por favor introduce su número de la pegatina' }}
            inputMode='numeric'
          >
            Número de la pegatina
          </InputField>
        </form>
      </IonContent>
    </IonModal>
  )
})
