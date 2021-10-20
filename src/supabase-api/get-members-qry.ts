import { supabase } from './supabase-client'
import { Member } from 'src/supabase-api/interfaces/member'

export async function getMembersQry(): Promise<Member[]> {
  const { data } = await supabase.from<Member>('members').select(`
  id,
  name,
  surname,
  phone_number,
  created_at
`)
  return data as Member[]
}
