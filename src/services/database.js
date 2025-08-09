import { supabase } from '../lib/supabase'

// save fighter
export async function saveFighter(fighterData) {
  const { data, error } = await supabase
    .from('savedFighters')
    .insert([{
      name: fighterData.Name,
      nickname: fighterData.Nickname || '',
      divisionTitle: fighterData["Division Title"] || '',
      divisionBody: `${fighterData["Division Body"]?.Wins || 0}W-${fighterData["Division Body"]?.Losses || 0}L-${fighterData["Division Body"]?.Draws || 0}D`,
      homeTown: fighterData["Fighter Bio"]?.Hometown || '',
      height: parseFloat(fighterData["Fighter Bio"]?.Height) || null,
      weight: parseFloat(fighterData["Fighter Bio"]?.Weight) || null
    }])
  
  return { data, error }
}

// get all fighters
export async function getSavedFighters() {
  const { data, error } = await supabase
    .from('savedFighters')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// delete fighter
export async function deleteFighter(id) {
  const { error } = await supabase
    .from('savedFighters')
    .delete()
    .eq('id', id)
  
  return { error }
}

// if-check
export async function isFighterSaved(name) {
  const { data, error } = await supabase
    .from('savedFighters')
    .select('id')
    .eq('name', name)
    .single()
  
  if (error && error.code === 'PGRST116') {
    return false
  }
  
  if (error) {
    return false
  }
  
  return !!data
}




// save fight
export async function saveFight(fightData) {
  const { data, error } = await supabase
    .from('savedFights')
    .insert([{
      date: fightData.date || '',
      matchup: `${fightData.fighter1} vs ${fightData.fighter2}`
    }])
  
  return { data, error }
}

// get fights
export async function getSavedFights() {
  const { data, error } = await supabase
    .from('savedFights')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// delete fight
export async function deleteFight(id) {
  const { error } = await supabase
    .from('savedFights')
    .delete()
    .eq('id', id)
  
  return { error }
}

// if-check
export async function isFightSaved(fighter1, fighter2, date) {
  const matchup = `${fighter1} vs ${fighter2}`
  const { data, error } = await supabase
    .from('savedFights')
    .select('id')
    .eq('matchup', matchup)
    .eq('date', date)
    .single()
  
  if (error && error.code === 'PGRST116') {
    return false
  }
  
  if (error) {
    return false
  }
  
  return !!data
}
