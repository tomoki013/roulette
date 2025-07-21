import { supabase } from '../supabaseClient';
import { Database } from '@/types/database.types';

type Roulette = Database['public']['Tables']['roulettes']['Row'];
type RouletteInsert = Database['public']['Tables']['roulettes']['Insert'];
type RouletteUpdate = Database['public']['Tables']['roulettes']['Update'];

/**
 * IDで特定のルーレットを取得します
 * @param id - 取得するルーレットのID
 * @returns ルーレットのデータ、見つからなければnull
 */
export const getRouletteById = async (id: string): Promise<Roulette | null> => {
    const { data, error } = await supabase
        .from('roulettes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching roulette by id:', error);
        // 行が見つからないエラー(PGRST116)は正常系として扱う
        if (error.code === 'PGRST116') {
            return null;
        }
        throw new Error(error.message);
    }
    return data;
};


/**
 * 新しいルーレットを作成します
 * @param rouletteData - 挿入するルーレットのデータ
 * @returns 作成されたルーレットのデータ
 */
export const createRoulette = async (rouletteData: RouletteInsert): Promise<Roulette> => {
  const { data, error } = await supabase
    .from('roulettes')
    .insert(rouletteData)
    .select()
    .single();

  if (error) {
    console.error('Error creating roulette:', error);
    throw new Error(error.message);
  }
  return data;
};

/**
 * 特定のユーザーIDに紐づくルーレットの一覧を取得します
 * @param userId - ユーザーのID
 * @returns ルーレットの配列
 */
export const getRoulettesByUserId = async (userId: string): Promise<Roulette[]> => {
  const { data, error } = await supabase
    .from('roulettes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching roulettes:', error);
    throw new Error(error.message);
  }
  return data;
};

/**
 * 特定のルーレットを更新します
 * @param id - 更新するルーレットのID
 * @param updates - 更新内容
 * @returns 更新されたルーレットのデータ
 */
export const updateRoulette = async (id: string, updates: RouletteUpdate): Promise<Roulette> => {
    const { data, error } = await supabase
        .from('roulettes')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating roulette:', error);
        throw new Error(error.message);
    }
    return data;
}

/**
 * 特定のルーレットを削除します
 * @param id - 削除するルーレットのID
 */
export const deleteRoulette = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('roulettes')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting roulette:', error);
        throw new Error(error.message);
    }
}
