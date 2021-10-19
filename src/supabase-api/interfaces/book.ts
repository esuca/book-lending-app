import { Author } from './author'

export interface Book {
  id: number
  created_at: string
  title: string
  book_number: number
  author_id: number
}

export interface CompleteBook extends Book {
  id: number,
  title: string,
  book_number: number
  authors: Pick<Author, 'id' | 'name'>
}
