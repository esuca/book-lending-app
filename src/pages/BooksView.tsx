import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage, IonRouterLink,
  IonSearchbar, IonSpinner,
  IonTitle,
  IonToolbar, useIonRouter
} from '@ionic/react'
import 'src/pages/BooksView.css'
import { useEffect, useState } from 'react'
import { getCompleteBooksQry } from '../supabase-api/get-complete-books-qry'
import { CompleteBook } from 'src/supabase-api/interfaces/book'
import { matchSorter } from 'match-sorter'
import { add } from 'ionicons/icons'

export const BooksView: React.FC = () => {
  const router = useIonRouter()
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState<CompleteBook[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCompleteBooksQry().then(response => {
      setLoading(false)
      setBooks(response)
    })
  }, [])

  const filteredBooks = matchSorter(books, searchText, { keys: ['title', 'book_number', 'authors.name'] })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Libros</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => router.push('/forms')}>
              <IonIcon icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="Introduce el título, autor o número" debounce={0}/>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Libros</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isLoading && <IonSpinner className="books-loading-spinner" />}
        {filteredBooks.length !== 0 && (
          <IonList>
            {filteredBooks.map((book) => {
              return (
                <IonItem key={book.id}>
                  <IonLabel>{book.title}</IonLabel>
                </IonItem>
              )
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  )
}
