// src/home.tsx
import { head } from 'levelojs';

export default function Home() {
  head({
    title: "External Protocol Test | Levelo JS"
  });

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>External Protocol Testing</h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
        Test if mailto, tel, and whatsapp links bypass the Levelo JS router correctly.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Email Test */}
        <a 
          href="mailto:support@levelojs.dev" 
          style={{
            padding: '10px 15px',
            backgroundColor: '#0284c7',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: '500'
          }}
        >
          📧 Send Email (mailto:)
        </a>

        {/* Phone Call Test */}
        <a 
          href="tel:+8801700000000" 
          style={{
            padding: '10px 15px',
            backgroundColor: '#16a34a',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: '500'
          }}
        >
          📞 Call Phone (tel:)
        </a>

        {/* WhatsApp Test */}
        <a href="https://wa.me/880180417223?text=Hello%20LeveloJS"
          style={{
            padding: '10px 15px',
            backgroundColor: '#25D366',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: '500'
          }}
        >
          💬 Open WhatsApp (whatsapp:)
        </a>

        {/* SMS Test */}
        <a 
          href="sms:+8801700000000?body=Testing%20LeveloJS" 
          style={{
            padding: '10px 15px',
            backgroundColor: '#4f46e5',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: '500'
          }}
        >
          💬 Send SMS (sms:)
        </a>
      </div>
    </div>
  );
}