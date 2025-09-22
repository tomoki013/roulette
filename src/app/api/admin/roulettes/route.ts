import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getOfficialTemplates, createRoulette } from '@/lib/services/rouletteService';
import { Database } from '@/types/database.types';

type RouletteInsert = Database['public']['Tables']['roulettes']['Insert'];

// Helper function to check for admin authentication
const isAuthenticated = async (): Promise<boolean> => {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session');
    return session?.value === 'true';
};

/**
 * API route to get all official templates.
 * GET /api/admin/roulettes
 */
export async function GET() {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const templates = await getOfficialTemplates();
        return NextResponse.json(templates);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error fetching official templates:', errorMessage);
        return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
    }
}

/**
 * API route to create a new official template.
 * POST /api/admin/roulettes
 */
export async function POST(req: NextRequest) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();

        // Ensure the correct properties are set for an official template
        const newTemplateData: RouletteInsert = {
            ...body,
            user_id: null,
            is_template: true,
            is_official: true, // Explicitly set as official
            like_count: 0, // Initialize like count
        };

        const createdTemplate = await createRoulette(newTemplateData);
        return NextResponse.json(createdTemplate, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error creating official template:', errorMessage);
        return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
    }
}
