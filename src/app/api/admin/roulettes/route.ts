import { NextRequest, NextResponse } from "next/server";
import {
  createRoulette,
} from "@/lib/services/rouletteService";
import { Database } from "@/types/database.types";
import { OFFICIAL_USER_ID } from "@/constants/common";

type RouletteInsert = Database["public"]["Tables"]["roulettes"]["Insert"];

/**
 * API route to create a new official template.
 * POST /api/admin/roulettes
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Ensure the correct properties are set for an official template
    const newTemplateData: RouletteInsert = {
      ...body,
      user_id: OFFICIAL_USER_ID,
      is_template: true,
      is_official: true, // Explicitly set as official
      like_count: 0, // Initialize like count
    };

    const createdTemplate = await createRoulette(newTemplateData);
    return NextResponse.json(createdTemplate, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error creating official template:", errorMessage);
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}