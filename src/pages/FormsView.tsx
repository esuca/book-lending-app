import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar
} from '@ionic/react'
import { useState } from 'react'
import { MemberForm } from 'src/components/MemberForm'

export const FormsView: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<'book' | 'member'>('book')
  const ios = false

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref="/books" text={ ios ? 'February' : '' } />
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton>
              Limpiar
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={selectedSegment} onIonChange={e => setSelectedSegment(e.detail.value as any)}>
            <IonSegmentButton value='book'>
              <IonLabel>Libro</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value='member'>
              <IonLabel>Miembro</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {selectedSegment === 'book' && <p>Books</p>}
        {selectedSegment === 'member' && <MemberForm />}
      </IonContent>
    </IonPage>
  )
}
