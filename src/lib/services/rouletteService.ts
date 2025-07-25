// src/lib/services/rouletteService.ts (リファクタリング後)
import { supabase } from '../supabaseClient';
import { Database } from '@/types/database.types';
import { PostgrestError } from '@supabase/supabase-js';

// Type aliases for better readability
type Roulette = Database['public']['Tables']['roulettes']['Row'];
type RouletteInsert = Database['public']['Tables']['roulettes']['Insert'];
type RouletteUpdate = Database['public']['Tables']['roulettes']['Update'];

// Error handling utility
const handleSupabaseError = (error: PostgrestError, context: string) => {
    console.error(`Error in ${context}:`, error);
    throw new Error(error.message);
};

/**
 * Fetches public templates with filtering and sorting
 * @param query - Search keyword
 * @param sortBy - Sort order ('created_at' or 'like_count')
 * @param language - Language filter
 * @returns Array of template roulettes
 */
export const getPublicTemplates = async (
    query: string,
    sortBy: 'created_at' | 'like_count',
    language: string | null
): Promise<Roulette[]> => {
    let supabaseQuery = supabase
        .from('roulettes')
        .select('*, profiles(username)')
        .eq('is_template', true);

    // Apply search filter
    if (query) {
        supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,description::text.ilike.%${query}%`);
    }

    // Apply language filter
    if (language) {
        supabaseQuery = supabaseQuery.contains('supported_languages', [language]);
    }

    // Apply sorting
    supabaseQuery = supabaseQuery.order(sortBy, { ascending: false });

    const { data, error } = await supabaseQuery;

    if (error) {
        handleSupabaseError(error, 'getPublicTemplates');
    }

    return data || [];
};

/**
 * Fetches a specific roulette by ID
 * @param id - Roulette ID
 * @returns Roulette data or null if not found
 */
export const getRouletteById = async (id: string): Promise<Roulette | null> => {
    const { data, error } = await supabase
        .from('roulettes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null; // Not found
        }
        handleSupabaseError(error, 'getRouletteById');
    }

    return data;
};

/**
 * Creates a new roulette
 * @param rouletteData - Roulette data to insert
 * @returns Created roulette data
 */
export const createRoulette = async (rouletteData: RouletteInsert): Promise<Roulette> => {
    const { data, error } = await supabase
        .from('roulettes')
        .insert(rouletteData)
        .select()
        .single();

    if (error) {
        handleSupabaseError(error, 'createRoulette');
    }

    return data;
};

/**
 * Fetches all roulettes for a specific user
 * @param userId - User ID
 * @returns Array of user's roulettes
 */
export const getRoulettesByUserId = async (userId: string): Promise<Roulette[]> => {
    const { data, error } = await supabase
        .from('roulettes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        handleSupabaseError(error, 'getRoulettesByUserId');
    }

    return data || [];
};

/**
 * Updates a specific roulette
 * @param id - Roulette ID
 * @param updates - Update data
 * @returns Updated roulette data
 */
export const updateRoulette = async (id: string, updates: RouletteUpdate): Promise<Roulette> => {
    const { data, error } = await supabase
        .from('roulettes')
        .update({ 
            ...updates, 
            updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        handleSupabaseError(error, 'updateRoulette');
    }

    return data;
};

/**
 * Deletes a specific roulette
 * @param id - Roulette ID
 */
export const deleteRoulette = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('roulettes')
        .delete()
        .eq('id', id);

    if (error) {
        handleSupabaseError(error, 'deleteRoulette');
    }
};
