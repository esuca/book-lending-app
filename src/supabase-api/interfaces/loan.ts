import { Book } from 'src/supabase-api/interfaces/book'
import { Member } from 'src/supabase-api/interfaces/member'

export interface Loan {
  id: number
  created_at: string
  book_id: number
  member_id: number
  taken_date: string
  returned: boolean
}

export interface CompleteLoan {
  id: number
  taken_date: string
  books: Pick<Book, 'id' | 'title'>
  members: Pick<Member, 'id' | 'name' | 'surname'>
}
