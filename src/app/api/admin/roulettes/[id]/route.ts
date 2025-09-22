import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getRouletteById, updateRoulette, deleteRoulette } from '@/lib/services/rouletteService';
import { Database } from '@/types/database.types';

type RouletteUpdate = Database['public']['Tables']['roulettes']['Update'];

// Helper function to check for admin authentication
const isAuthenticated = (): boolean => {
    const session = cookies().get('admin-session');
    return session?.value === 'true';
};

// Helper to verify that the template being modified is indeed an official one
const isOfficialTemplate = async (id: string): Promise<boolean> => {
    const roulette = await getRouletteById(id);
    // It's an official template if it exists and its user_id is null
    return !!roulette && roulette.user_id === null;
};

/**
 * API route to update an official template.
 * PUT /api/admin/roulettes/[id]
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!await isOfficialTemplate(id)) {
        return NextResponse.json({ error: 'Forbidden: Not an official template' }, { status: 403 });
    }

    try {
        const body = await req.json();
        // Ensure user_id is not altered
        delete body.user_id;

        const updatedTemplate = await updateRoulette(id, body as RouletteUpdate);
        return NextResponse.json(updatedTemplate);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error(`Error updating template ${id}:`, errorMessage);
        return NextResponse.json({ error: 'Failed to update template' }, { status: 500 });
    }
}

/**
 * API route to delete an official template.
 * DELETE /api/admin/roulettes/[id]
 */
export async function DELETE(req: NextRequest, { params }: { params: { id:string } }) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!await isOfficialTemplate(id)) {
        return NextResponse.json({ error: 'Forbidden: Not an official template' }, { status: 403 });
    }

    try {
        await deleteRoulette(id);
        return new NextResponse(null, { status: 204 }); // 204 No Content is standard for successful deletion
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error(`Error deleting template ${id}:`, errorMessage);
        return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 });
    }
}
