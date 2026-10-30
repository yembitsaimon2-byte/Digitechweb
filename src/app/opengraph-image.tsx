import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'Digitech Web — Agence Digitale Premium';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0A',
          padding: '80px',
          border: '12px solid #161616',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: '#C8F04A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '28px',
              color: '#0A0A0A',
            }}
          >
            D
          </div>
          <span style={{ fontSize: '32px', fontWeight: 800, color: '#F5F0EB', letterSpacing: '2px' }}>
            DIGITECH WEB
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '52px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, maxWidth: '950px' }}>
            Nous digitalisons votre activité pour mieux vendre, travailler et grandir.
          </div>
          <div style={{ fontSize: '24px', color: '#9A9590', maxWidth: '850px' }}>
            Sites web, applications & logiciels sur mesure • Studio digital fondé par Yembit Saïmon
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '20px', color: '#C8F04A', fontWeight: 600 }}>
            digitechweb.online
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
