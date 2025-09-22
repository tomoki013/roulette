import { getOfficialTemplates } from '@/lib/services/rouletteService';
import { AdminDashboardClient } from './components/AdminDashboardClient';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Locale } from '@/i18n-config';
import { createTranslation } from '@/i18n/server';

export default async function AdminDashboardPage({ params: { locale } }: { params: { locale: Locale } }) {
    // Fetch initial data on the server
    const templates = await getOfficialTemplates();
    const { t } = await createTranslation(locale, 'admin');

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">{t('dashboard.title')}</h1>
                    <Link
                        href={`/${locale}/admin/new`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                    >
                        <Plus size={20} />
                        {t('dashboard.newTemplate')}
                    </Link>
                </div>
                {/* Delegate client-side interactions to a Client Component */}
                <AdminDashboardClient initialTemplates={templates} />
            </div>
        </div>
    );
}
