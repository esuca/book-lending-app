import { supabase } from './supabase-client'
import { CompleteLoan } from 'src/supabase-api/interfaces/loan'

export async function getCompleteLoansQry(): Promise<CompleteLoan[]> {
  const { data } = await supabase
    .from('loans')
    .select(
      `
        id,
        taken_date,
        books (
          id,
          title
        ),
        members (
          id,
          name,
          surname
        )
      `
    )
    .eq('returned', false)
    .order('surname', { foreignTable: 'members', ascending: false })
  return data as CompleteLoan[]
}
