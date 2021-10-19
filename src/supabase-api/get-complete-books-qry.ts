import {CompleteBook} from "./interfaces/book";
import {supabase} from "./supabase-client";

export async function getCompleteBooksQry(): Promise<CompleteBook[]> {
  const { data } = await supabase.from<CompleteBook>('books').select(`
  id,
  title,
  book_number,
  authors:author_id ( id, name )
`)
  return data as CompleteBook[]
}

