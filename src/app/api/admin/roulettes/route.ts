import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getOfficialTemplates, createRoulette } from '@/lib/services/rouletteService';
import { Database } from '@/types/database.types';

type RouletteInsert = Database['public']['Tables']['roulettes']['Insert'];

// Helper function to check for admin authentication
const isAuthenticated = (): boolean => {
    const session = cookies().get('admin-session');
    // In a real-world scenario, you'd verify a token here.
    // For this implementation, we just check if the cookie exists and has the expected value.
    return session?.value === 'true';
};

/**
 * API route to get all official templates.
 * GET /api/admin/roulettes
 */
export async function GET() {
    if (!isAuthenticated()) {
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
    if (!isAuthenticated()) {
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
