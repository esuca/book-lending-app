import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar, IonSpinner,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import './Tab1.css'
import { useEffect, useState } from 'react'
import { getCompleteBooksQry } from '../supabase-api/get-complete-books-qry'
import { CompleteBook } from 'src/supabase-api/interfaces/book'
import { matchSorter } from 'match-sorter'

const Tab1: React.FC = () => {
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
          <IonTitle>Books</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="Introduce el título, autor o número" debounce={0}/>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Books</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isLoading && <IonSpinner className="loading-spinner" />}
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

export default Tab1
