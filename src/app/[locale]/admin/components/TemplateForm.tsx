'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SettingsPanel from '@/components/features/roulette/SettingsPanel';
import { Item } from '@/types';
import { Database } from '@/types/database.types';
import { useTranslation } from 'react-i18next';

type Roulette = Database['public']['Tables']['roulettes']['Row'];

interface TemplateFormProps {
    initialData?: Roulette | null;
}

const generateDefaultItem = (): Item => ({ name: '', ratio: 1, color: '#FFFFFF' });

export function TemplateForm({ initialData }: TemplateFormProps) {
    const router = useRouter();
    const { t } = useTranslation('admin');
    const params = useParams();
    const locale = params.locale as string;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [items, setItems] = useState<Item[]>([generateDefaultItem(), generateDefaultItem()]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);

            const desc = initialData.description;
            if (typeof desc === 'object' && desc !== null && locale in desc) {
                setDescription((desc as Record<string, string>)[locale]);
            } else if (typeof desc === 'string') {
                setDescription(desc);
            }

            if (Array.isArray(initialData.items)) {
                setItems(initialData.items as unknown as Item[]);
            }
        }
    }, [initialData, locale]);

    const handleItemUpdate = (index: number, field: keyof Item, value: string | number) => {
        const newItems = [...items];
        const item = newItems[index];
        (item as any)[field] = value;
        setItems(newItems);
    };

    const handleItemAdd = () => {
        setItems([...items, generateDefaultItem()]);
    };

    const handleItemRemove = (index: number) => {
        if (items.length > 2) {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
        }
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        setError(null);

        // For simplicity in the admin panel, we'll save the description
        // as a simple string. The public-facing side can handle i18n objects.
        const payload = {
            title,
            description: { [locale]: description }, // Save description in a JSON object with locale key
            items,
        };

        const url = initialData ? `/api/admin/roulettes/${initialData.id}` : '/api/admin/roulettes';
        const method = initialData ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        setIsSaving(false);

        if (res.ok) {
            router.push(`/${locale}/admin`);
            router.refresh();
        } else {
            try {
                const data = await res.json();
                setError(data.error || t('form.saveError'));
            } catch {
                setError(t('form.saveError'));
            }
        }
    };

    return (
        <div className="space-y-6">
            {error && <div className="p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">{error}</div>}

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                 <label htmlFor="template-description" className="block text-white/80 text-sm font-medium mb-2">
                    {t('form.descriptionLabel')}
                 </label>
                 <textarea
                    id="template-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-24 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    placeholder={t('form.descriptionPlaceholder')}
                 />
            </div>

            <SettingsPanel
                title={title}
                onTitleChange={setTitle}
                items={items}
                onItemAdd={handleItemAdd}
                onItemRemove={handleItemRemove}
                onItemUpdate={handleItemUpdate}
                onSave={handleSubmit}
                isSaving={isSaving}
                isLoggedIn={true}
                saveButtonText={initialData ? t('form.updateButton') : t('form.createButton')}
            />
        </div>
    );
}
