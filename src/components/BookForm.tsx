import React from 'react'
import { IonInput, IonItem, IonLabel } from '@ionic/react'

export const BookForm = () => {
  return (
    <div>
      <IonItem>
        <IonLabel>Título</IonLabel>
        <IonInput name="title" />
      </IonItem>
      <IonItem>
        <IonLabel>Número</IonLabel>
        <IonInput name="book_number" />
      </IonItem>
      <IonItem>
        <IonLabel>Teléfono</IonLabel>
        <IonInput name="phone_number" type="tel" />
      </IonItem>
    </div>
  )
}
