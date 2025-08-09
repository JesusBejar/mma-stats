import { supabase } from '../lib/supabase'

// if-check for database
export async function checkTables() {
  const { error: fightersError } = await supabase
    .from('savedFighters')
    .select('*')
    .limit(1)
  
  const { error: fightsError } = await supabase
    .from('savedFights') 
    .select('*')
    .limit(1)
  
  return !fightersError && !fightsError
}
