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
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter
} from '@ionic/react'
import 'src/pages/BooksView.css'
import { useEffect, useRef, useState } from 'react'
import { getCompleteBooksQry } from '../supabase-api/get-complete-books-qry'
import { Book, CompleteBook } from 'src/supabase-api/interfaces/book'
import { matchSorter } from 'match-sorter'
import { add, close, person } from 'ionicons/icons'
import { BookFormModal } from 'src/components/BookFormModal'

export const BooksView: React.FC = () => {
  const [showBookActionSheet, setShowBookActionSheet] = useState(false)
  const router = useIonRouter()

  const [searchText, setSearchText] = useState('')
  const [books, setBooks] = useState<CompleteBook[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined)

  const pageRef = useRef<HTMLElement>(null)
  const bookModalRef = useRef<HTMLIonModalElement>(null)

  const [showBookFormModal, setShowBookFormModal] = useState(false)

  useIonViewWillEnter(() => {
    getCompleteBooksQry().then(response => {
      setBooks(response)
    })
  }, [])

  const filteredBooks = matchSorter(books, searchText, { keys: ['title', 'book_number', 'authors.name'] })

  const openBookActionSheet = (book: Book) => {
    setSelectedBook(book)
    setShowBookActionSheet(true)
  }

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
                <IonItem key={book.id} onClick={() => openBookActionSheet(book)}>
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
          isOpen={showBookActionSheet}
          onDidDismiss={() => setShowBookActionSheet(false)}
          buttons={[
            {
              text: 'Prestar',
              icon: person,
              handler: () => {
                router.push(`/borrow-book?bookId=${selectedBook?.id}`)
              }
            },
            {
              text: 'Cancelar',
              icon: close,
              role: 'cancel',
              handler: () => {
                setShowBookActionSheet(false)
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
