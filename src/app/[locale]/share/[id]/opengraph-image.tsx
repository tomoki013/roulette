import { ImageResponse } from 'next/og';
import { getRouletteById } from '@/lib/services/rouletteService';
import { Item } from '@/types';

export const runtime = 'nodejs';

export const alt = 'Web Roulette';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let title = 'Web Roulette';
  let items: Item[] = [];

  try {
      const roulette = await getRouletteById(id);
      if (roulette) {
          title = roulette.title;

          if (roulette.description && typeof roulette.description === 'object' && !Array.isArray(roulette.description)) {
              const desc = roulette.description as any;
              if (desc.result) {
                  title = `Result: ${desc.result}`;
              }
          }

          if (Array.isArray(roulette.items)) {
              items = roulette.items as unknown as Item[];
          }
      }
  } catch (e) {
      console.error(e);
  }

  // Calculate gradient
  const totalRatio = items.reduce((acc, item) => acc + (item.ratio || 1), 0);
  let currentAngle = 0;

  // Default colors if missing
  const defaultColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

  const gradientParts = items.map((item, index) => {
    const ratio = item.ratio || 1;
    const angle = (ratio / totalRatio) * 360;
    const start = currentAngle;
    const end = currentAngle + angle;
    currentAngle += angle;
    const color = item.color || defaultColors[index % defaultColors.length];
    return `${color} ${start}deg ${end}deg`;
  });

  const gradientString = gradientParts.length > 0
    ? `conic-gradient(${gradientParts.join(', ')})`
    : 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          color: 'white',
          padding: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', justifyContent: 'center' }}>
             <div style={{ fontSize: 60, fontWeight: 'bold', marginBottom: 20, lineHeight: 1.2, display: 'flex' }}>
                {title}
             </div>
             <div style={{ fontSize: 30, opacity: 0.8, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: 'linear-gradient(to right, #ec4899, #8b5cf6)', borderRadius: '8px', padding: '4px 12px', fontSize: 20 }}>Web Roulette</span>
                <span>Create & Share</span>
             </div>
        </div>

        <div style={{
            display: 'flex',
            width: 450,
            height: 450,
            borderRadius: '50%',
            backgroundImage: gradientString,
            border: '10px solid rgba(255,255,255,0.1)',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
             <div style={{
                 display: 'flex',
                 width: 40,
                 height: 40,
                 borderRadius: '50%',
                 background: 'white',
                 boxShadow: '0 0 10px rgba(0,0,0,0.5)',
             }}/>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
