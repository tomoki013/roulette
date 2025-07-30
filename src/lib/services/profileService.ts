import { supabase } from '../supabaseClient';
import { Database } from '@/types/database.types';
import { PostgrestError } from '@supabase/supabase-js';

// 型エイリアス
type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// エラーハンドリング
const handleSupabaseError = (error: PostgrestError, context: string) => {
    console.error(`Error in ${context}:`, error);
    throw new Error(error.message);
};

/**
 * ユーザーIDに基づいてプロフィールを取得します
 * @param userId - ユーザーID
 * @returns プロフィールデータ、見つからない場合はnull
 */
export const getProfileByUserId = async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') { // データが存在しない場合のエラーコード
            return null;
        }
        handleSupabaseError(error, 'getProfileByUserId');
    }

    return data;
};

/**
 * プロフィールを更新します
 * @param userId - ユーザーID
 * @param updates - 更新するデータ
 * @returns 更新されたプロフィールデータ
 */
export const updateProfile = async (userId: string, updates: ProfileUpdate): Promise<Profile> => {
    const { data, error } = await supabase
        .from('profiles')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        handleSupabaseError(error, 'updateProfile');
    }

    return data;
};
