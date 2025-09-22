import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        // To log the user out, we delete the session cookie.
        // This is done by setting the cookie with a `maxAge` of 0.
        cookies().set('admin-session', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0, // Immediately expire the cookie
            path: '/',
        });
        return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    } catch (error) {
        console.error('Logout API error:', error);
        return NextResponse.json({ error: 'An error occurred during logout' }, { status: 500 });
    }
}
