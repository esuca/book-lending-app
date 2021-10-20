import React, { forwardRef, useEffect, useState } from 'react'
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar
} from '@ionic/react'

export type BookToReturn = { loanId: number; title: string }

interface Props {
  presentingElement: HTMLElement
  isOpen: boolean
  onClose: () => void
  booksToReturn: BookToReturn[]
}

type CheckboxOption = BookToReturn & { isChecked: boolean }

export const BooksToReturnModal = forwardRef<HTMLIonModalElement, Props>((props, ref) => {
  const [selectedBooksToReturn, setSelectedBooksToReturn] = useState<CheckboxOption[]>([])

  useEffect(() => {
    setSelectedBooksToReturn(
      props.booksToReturn.map(b => ({
        ...b,
        isChecked: true
      }))
    )
    console.log('cuantas veces te ejecutas')
  }, [props.booksToReturn])

  const toggleCheckboxOption = (book: BookToReturn) => {
    const selectedBook = selectedBooksToReturn.findIndex(b => b.loanId === book.loanId)
    const booksCopy = selectedBooksToReturn.slice()
    booksCopy[selectedBook].isChecked = !booksCopy[selectedBook].isChecked
    setSelectedBooksToReturn(booksCopy)
  }

  const doReturnBooks = async () => {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve('asd')
        console.log('return book')
      }, 200)
    })
  }

  const isValid = selectedBooksToReturn.some(v => v.isChecked)

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
          <IonTitle>Devolver libros</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={doReturnBooks} disabled={!isValid} color={!isValid ? 'dark' : 'primary'}>
              OK
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {selectedBooksToReturn.map((book, i) => (
          <IonItem key={i}>
            <IonLabel>{book.title}</IonLabel>
            <IonCheckbox
              slot='end'
              value={book.loanId}
              checked={book.isChecked}
              onIonChange={() => toggleCheckboxOption(book)}
            />
          </IonItem>
        ))}
      </IonContent>
    </IonModal>
  )
})
