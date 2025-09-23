// src/lib/services/rouletteService.ts (リファクタリング後)
import { getSupabase } from "../supabaseClient";
import { Database } from "@/types/database.types";
import { PostgrestError } from "@supabase/supabase-js";

// Type aliases for better readability
type Roulette = Database["public"]["Tables"]["roulettes"]["Row"];
type RouletteInsert = Database["public"]["Tables"]["roulettes"]["Insert"];
type RouletteUpdate = Database["public"]["Tables"]["roulettes"]["Update"];

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
  sortBy: "created_at" | "like_count",
  language: string | null
): Promise<Roulette[]> => {
  const supabase = getSupabase();
  let supabaseQuery = supabase
    .from("roulettes")
    .select("*, profiles(username)")
    .eq("is_template", true);

  // Apply search filter
  if (query) {
    supabaseQuery = supabaseQuery.or(
      `title.ilike.%${query}%,description::text.ilike.%${query}%`
    );
  }

  // Apply language filter
  if (language) {
    supabaseQuery = supabaseQuery.contains("supported_languages", [language]);
  }

  // Apply sorting
  supabaseQuery = supabaseQuery.order(sortBy, { ascending: false });

  const { data, error } = await supabaseQuery;

  if (error) {
    handleSupabaseError(error, "getPublicTemplates");
  }

  // dataがnullの場合にエラーを投げる処理を追加
  if (!data) {
    throw new Error("Failed to update roulette, no data returned.");
  }

  return data || [];
};

/**
 * Fetches public templates for a specific user
 * @param userId - User ID
 * @returns Array of user's public templates
 */
export const getPublicTemplatesByUserId = async (
  userId: string
): Promise<Roulette[]> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("roulettes")
    .select("*, profiles(username)")
    .eq("user_id", userId)
    .eq("is_template", true)
    .order("created_at", { ascending: false });

  if (error) {
    handleSupabaseError(error, "getPublicTemplatesByUserId");
  }

  // dataがnullの場合にエラーを投げる処理を追加
  if (!data) {
    throw new Error("Failed to update roulette, no data returned.");
  }

  return data || [];
};

/**
 * Fetches a specific roulette by ID
 * @param id - Roulette ID
 * @returns Roulette data or null if not found
 */
export const getRouletteById = async (id: string): Promise<Roulette | null> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("roulettes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Not found
    }
    handleSupabaseError(error, "getRouletteById");
  }

  // dataがnullの場合にエラーを投げる処理を追加
  if (!data) {
    throw new Error("Failed to update profile, no data returned.");
  }

  return data;
};

/**
 * Creates a new roulette
 * @param rouletteData - Roulette data to insert
 * @returns Created roulette data
 */
export const createRoulette = async (
  rouletteData: RouletteInsert
): Promise<Roulette> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("roulettes")
    .insert(rouletteData)
    .select()
    .single();

  if (error) {
    handleSupabaseError(error, "createRoulette");
  }

  // dataがnullの場合にエラーを投げる処理を追加
  if (!data) {
    throw new Error("Failed to create roulette, no data returned.");
  }

  return data;
};

/**
 * Fetches all roulettes for a specific user
 * @param userId - User ID
 * @returns Array of user's roulettes
 */
export const getRoulettesByUserId = async (
  userId: string
): Promise<Roulette[]> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("roulettes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    handleSupabaseError(error, "getRoulettesByUserId");
  }

  // dataがnullの場合にエラーを投げる処理を追加
  if (!data) {
    throw new Error("Failed to update roulette, no data returned.");
  }

  return data || [];
};

/**
 * Updates a specific roulette
 * @param id - Roulette ID
 * @param updates - Update data
 * @returns Updated roulette data
 */
export const updateRoulette = async (
  id: string,
  updates: RouletteUpdate
): Promise<Roulette> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("roulettes")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    handleSupabaseError(error, "updateRoulette");
  }

  // dataがnullの場合にエラーを投げる処理を追加
  if (!data) {
    throw new Error("Failed to update roulette, no data returned.");
  }

  return data;
};

/**
 * Deletes a specific roulette
 * @param id - Roulette ID
 */
export const deleteRoulette = async (id: string): Promise<void> => {
  const supabase = getSupabase();
  const { error } = await supabase.from("roulettes").delete().eq("id", id);

  if (error) {
    handleSupabaseError(error, "deleteRoulette");
  }
};

/**
 * 特定のルーレットのいいね数をインクリメントします (RPCを使用)
 * @param id - ルーレットID
 * @returns 更新されたいいね数を持つオブジェクト
 */
export const incrementLikeCount = async (
  id: string
): Promise<{ id: string; like_count: number }> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .rpc("increment_like_count", {
      roulette_id: id,
    })
    .single(); // rpcからの戻り値が単一であることを保証

  // RPC呼び出しでエラーが発生した場合
  if (error) {
    handleSupabaseError(error, "incrementLikeCount (rpc)");
  }

  // データが何らかの理由で返ってこなかった場合（例: 該当IDが存在しない）
  if (!data) {
    throw new Error(
      "Failed to increment like count, roulette not found or no data returned."
    );
  }

  // 型が期待通りであることを保証して返す
  return {
    id: data.id,
    like_count: data.like_count,
  };
};

/**
 * 特定のルーレットのいいね数をデクリメントします (RPCを使用)
 * @param id - ルーレットID
 * @returns 更新されたいいね数を持つオブジェクト
 */
export const decrementLikeCount = async (
  id: string
): Promise<{ id: string; like_count: number }> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .rpc("decrement_like_count", {
      roulette_id: id,
    })
    .single();

  if (error) {
    handleSupabaseError(error, "decrementLikeCount (rpc)");
  }

  if (!data) {
    throw new Error(
      "Failed to decrement like count, roulette not found or no data returned."
    );
  }

  return data;
};

import { OFFICIAL_USER_ID } from "@/constants/common";

/**
 * Fetches official templates (user_id is the official user ID)
 * @returns Array of official template roulettes
 */
export const getOfficialTemplates = async (): Promise<Roulette[]> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("roulettes")
    .select("*") // No need to join profiles for official templates
    .eq("user_id", OFFICIAL_USER_ID)
    .eq("is_template", true)
    .order("created_at", { ascending: false });

  if (error) {
    handleSupabaseError(error, "getOfficialTemplates");
  }

  if (!data) {
    throw new Error("Failed to fetch official templates, no data returned.");
  }

  return data || [];
};
