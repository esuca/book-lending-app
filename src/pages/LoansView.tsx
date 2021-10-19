import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import 'src/pages/LoansView.css'

export const LoansView: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Préstamos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Préstamos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name='Tab 2 page' />
      </IonContent>
    </IonPage>
  )
}
