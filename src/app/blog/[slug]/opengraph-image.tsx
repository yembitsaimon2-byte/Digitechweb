import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, true);

  const title = post ? post.title : 'Blog Digitech Web';
  const category = post ? post.category : 'Article';
  const author = post ? post.author : 'Yembit Saïmon';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            right: '-150px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,240,74,0.15) 0%, rgba(10,10,10,0) 70%)',
          }}
        />

        {/* Top bar: Brand + Category */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '28px',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#f5f0eb',
              }}
            >
              DIGITECH <span style={{ color: '#C8F04A' }}>WEB</span>
            </span>
            <span
              style={{
                fontSize: '18px',
                color: '#5A5753',
                marginLeft: '8px',
              }}
            >
              / BLOG
            </span>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(200, 240, 74, 0.12)',
              border: '1px solid #C8F04A',
              color: '#C8F04A',
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '18px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {category}
          </div>
        </div>

        {/* Middle: Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            zIndex: 1,
            maxWidth: '1000px',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 50 ? '54px' : '64px',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#F5F0EB',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom bar: Author & Web URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '32px',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#1E1E1E',
                border: '2px solid #C8F04A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C8F04A',
                fontWeight: 700,
                fontSize: '20px',
              }}
            >
              YS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '20px', fontWeight: 600, color: '#F5F0EB' }}>
                {author}
              </span>
              <span style={{ fontSize: '15px', color: '#9A9590' }}>
                Fondateur de Digitech Web
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: '18px',
              color: '#9A9590',
              letterSpacing: '0.05em',
            }}
          >
            digitech-web.fr
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
