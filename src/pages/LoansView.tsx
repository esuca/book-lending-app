import {
  IonActionSheet,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import 'src/pages/LoansView.css'
import { useEffect, useRef, useState } from 'react'
import { getCompleteLoansQry } from 'src/supabase-api/get-complete-loans-qry'
import { CompleteLoan } from 'src/supabase-api/interfaces/loan'
import { close, swapHorizontal } from 'ionicons/icons'
import { getMode } from '@ionic/core'
import { BookToReturn, BooksToReturnModal } from 'src/components/BooksToReturnModal'

export const LoansView: React.FC = () => {
  const mode = getMode()
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState<CompleteLoan | undefined>(undefined)

  const [loans, setLoans] = useState<CompleteLoan[]>([])

  const pageRef = useRef<HTMLElement>(null)
  const returnBooksModalRef = useRef<HTMLIonModalElement>(null)
  const [showReturnBooksModal, setShowReturnBooksModal] = useState(false)
  const [booksToReturn, setBooksToReturn] = useState<BookToReturn[]>([])

  useEffect(() => {
    getCompleteLoansQry().then(res => setLoans(res))
  }, [])

  const openActionSheet = (loan: CompleteLoan) => {
    setSelectedLoan(loan)
    setShowActionSheet(true)
  }

  const firstFilter = loans.filter(l => new Date(l.taken_date).getFullYear() < 2021)

  const doReturnBooks = async () => {
    const memberLoans = loans.filter(l => l.members.id === selectedLoan?.members.id)

    if (memberLoans.length === 1) {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve('asd')
          console.log('return book')
        }, 200)
      })
    } else {
      setBooksToReturn(memberLoans.map(l => ({ loanId: l.id, title: l.books.title })))
      setShowReturnBooksModal(true)
    }
  }

  return (
    <IonPage ref={pageRef}>
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
        <IonList>
          <IonListHeader>
            <IonLabel>Han superado el plazo</IonLabel>
          </IonListHeader>
          {firstFilter.map(l => (
            <IonItem key={l.id} onClick={() => openActionSheet(l)}>
              <IonLabel>
                <h2>{l.books.title}</h2>
                <p>
                  {l.members.name} {l.members.surname},{' '}
                  {new Date(l.taken_date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonList>
          <IonListHeader>
            <IonLabel>Pendientes de devolver</IonLabel>
          </IonListHeader>
          {loans.map(l => (
            <IonItem key={l.id} onClick={() => openActionSheet(l)}>
              <IonLabel>
                <h2>{l.books.title}</h2>
                <p>
                  {l.members.name} {l.members.surname},{' '}
                  {new Date(l.taken_date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonActionSheet
          header={selectedLoan?.books.title}
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: 'Devolver',
              icon: mode === 'ios' ? undefined : swapHorizontal,
              handler: doReturnBooks
            },
            {
              text: 'Cancelar',
              icon: mode === 'ios' ? undefined : close,
              role: 'cancel',
              handler: () => {
                setShowActionSheet(false)
              }
            }
          ]}
        />
        {pageRef.current !== null && (
          <BooksToReturnModal
            ref={returnBooksModalRef}
            presentingElement={pageRef.current}
            isOpen={showReturnBooksModal}
            onClose={() => setShowReturnBooksModal(false)}
            booksToReturn={booksToReturn}
          />
        )}
      </IonContent>
    </IonPage>
  )
}
