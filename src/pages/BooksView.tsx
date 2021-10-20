import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react'
import { getMode } from '@ionic/core'
import 'src/pages/BooksView.css'
import { useEffect, useRef, useState } from 'react'
import { getCompleteBooksQry } from '../supabase-api/get-complete-books-qry'
import { CompleteBook } from 'src/supabase-api/interfaces/book'
import { matchSorter } from 'match-sorter'
import { add, close, person } from 'ionicons/icons'
import { BookFormModal } from 'src/components/BookFormModal'

export const BooksView: React.FC = () => {
  const [showActionSheet, setShowActionSheet] = useState(false)
  const router = useIonRouter()

  const [searchText, setSearchText] = useState('')
  const [books, setBooks] = useState<CompleteBook[]>([])
  const [selectedBook, setSelectedBook] = useState<CompleteBook | undefined>(undefined)

  const pageRef = useRef<HTMLElement>(null)

  const bookModalRef = useRef<HTMLIonModalElement>(null)
  const [showBookFormModal, setShowBookFormModal] = useState(false)

  useEffect(() => {
    getCompleteBooksQry().then(response => {
      setBooks(response)
    })
  }, [])

  const filteredBooks = matchSorter(books, searchText, { keys: ['title', 'book_number', 'authors.name'] })

  const openActionSheet = (book: CompleteBook) => {
    setSelectedBook(book)
    setShowActionSheet(true)
  }

  const mode = getMode()

  return (
    <IonPage ref={pageRef}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Libros</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => setShowBookFormModal(true)}>
              <IonIcon icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonChange={e => setSearchText(e.detail.value!)}
            placeholder='Introduce el título, autor o número'
            debounce={0}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {filteredBooks.length !== 0 && (
          <IonList>
            {filteredBooks.map(book => {
              return (
                <IonItem key={book.id} onClick={() => openActionSheet(book)}>
                  <IonLabel>
                    <h2>{book.title}</h2>
                    <p>
                      {book.book_number} &#8226; {book.authors.name}
                    </p>
                  </IonLabel>
                </IonItem>
              )
            })}
          </IonList>
        )}
        <IonActionSheet
          header={selectedBook?.title}
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: 'Prestar',
              icon: mode === 'ios' ? undefined : person,
              handler: () => {
                router.push(`/borrow-book?bookId=${selectedBook?.id}`)
              }
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
          <BookFormModal
            ref={bookModalRef}
            presentingElement={pageRef.current}
            isOpen={showBookFormModal}
            onClose={() => setShowBookFormModal(false)}
          />
        )}
      </IonContent>
    </IonPage>
  )
}
